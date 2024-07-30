import React, { useCallback, useMemo, useState } from "react";
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

const PageContainer = ({ title, column, api }) => {
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100ch" }),
    []
  );
  const gridStyle = useMemo(
    () => ({ height: "100%", width: "100%", maxHeight: "85%" }),
    []
  );
  const [rowData, setRowData] = useState();
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: "agTextColumnFilter",
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    const getData = async () => {
      const res = await api();
      setRowData(res.data);
    };
    getData();
  }, []);

  return (
    <LayoutPage>
      <div style={containerStyle} className="px-5">
        <div className="py-5 px-3 flex justify-between items-center">
          <Title level={2} className="">
            {title}
          </Title>
          <Button type="primary">Thêm người dùng</Button>
        </div>
        <div style={gridStyle} className={"ag-theme-quartz"}>
          <AgGridReact
            rowData={rowData}
            columnDefs={column}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </LayoutPage>
  );
};

export default PageContainer;
