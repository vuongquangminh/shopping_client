import React, { useCallback, useMemo } from "react";
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
  rowData,
  setRowData,
  errApi,
  titleCreate,
  noData,
  setIsModalOpen,
}) => {
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100ch" }),
    []
  );
  const gridStyle = useMemo(
    () => ({ height: "100%", width: "100%", maxHeight: "85%" }),
    []
  );
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: "agTextColumnFilter",
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);

  const handleCreate = () => {
    setIsModalOpen(true);
  };

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
  return (
    <LayoutPage>
      <div style={containerStyle} className="px-5">
        <div className="py-5 px-3 flex justify-between items-center">
          <Title level={2} className="">
            {title}
          </Title>
          <Button type="primary" onClick={handleCreate}>
            {titleCreate}
          </Button>
        </div>
        <div style={gridStyle} className={"ag-theme-quartz"}>
          <AgGridReact
            rowData={rowData}
            columnDefs={column}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            overlayNoRowsTemplate={noData}
            overlayLoadingTemplate={`Đang tải`}
            pagination={true}
            paginationPageSize={20}
          />
        </div>
      </div>
    </LayoutPage>
  );
};

export default PageContainer;
