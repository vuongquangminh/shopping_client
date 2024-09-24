import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import LayoutPage from "./LayoutPage";
import Title from "antd/es/typography/Title";
import { Button } from "antd";
import request from "../utils/request";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  MultiFilterModule,
  SetFilterModule,
]);

const PageContainer = ({
  title,
  apicontext,
  column,
  api,
  errApi,
  titleCreate,
  noData,
  setIsModalOpen,
  defaultColDef,
  urlPathHeader,
}) => {
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState();

  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100ch" }),
    []
  );
  const gridStyle = useMemo(
    () => ({ height: "100%", width: "100%", maxHeight: "85%" }),
    []
  );
  // const defaultColDef = useMemo(() => {
  //   return {
  //     flex: 1,
  //     minWidth: 150,
  //     filter: "agTextColumnFilter",
  //     suppressHeaderMenuButton: true,
  //     suppressHeaderContextMenu: true,
  //   };
  // }, []);

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setColumnDefs(column);
  }, [column, rowData]);

  const onGridReady = useCallback(
    (params) => {
      // gridApiRef.current = params.api;
      const getData = async () => {
        params.api.showLoadingOverlay();
        try {
          const res = await api();
          setRowData(res.data);
        } catch (err) {
          apicontext.error({
            message: "Thất bại",
            description: errApi,
          });
        } finally {
          params.api.hideOverlay();
        }
      };
      getData();
    },
    [api, apicontext, errApi, setRowData]
  );
  const onCellValueChanged = (params) => {
    console.log("params: ", params);
    const field = params.colDef.field;
    const updateRow = async () => {
      try {
        const payload = { [field]: params.newValue, field }; // Dynamically set the field
        const res = await request.put(
          `${params.colDef.api}/${params.data.id}`,
          payload
        );
        console.log("res: ", res);
        apicontext.success({
          message: "Thành công",
          description: "Chỉnh sửa thành công",
        });
      } catch (error) {
        console.error("Error updating row: ", error);
        apicontext.error({
          message: "Thất bại",
          description: "Chỉnh sửa thất bại",
        });
        const updatedData = [...rowData];
        console.log("aa: ", params.oldValue);
        updatedData[params.node.rowIndex] = {
          ...params.data,
          [field]: params.oldValue,
        };
        console.log("updatedData: ", updatedData);
        setRowData(updatedData);
      }
    };
    updateRow();
  };

  return (
    <LayoutPage urlPathHeader={urlPathHeader}>
      <div style={containerStyle} className="px-5">
        <div className="py-5 px-3 flex justify-between items-center">
          <Title level={2} className="">
            {title}
          </Title>
          {titleCreate && (
            <Button type="primary" onClick={handleCreate}>
              {titleCreate}
            </Button>
          )}
        </div>
        <div style={gridStyle} className={"ag-theme-quartz"}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            overlayNoRowsTemplate={noData}
            overlayLoadingTemplate={`Đang tải`}
            pagination={true}
            onCellValueChanged={onCellValueChanged}
            paginationPageSize={20}
          />
        </div>
      </div>
    </LayoutPage>
  );
};

export default PageContainer;
