import React, { useState } from 'react';
import {
  deselectAllFilteredRows,
  deselectRow,
  selectAllFilteredRows,
  selectRow,
  selectRowsRange,
} from 'ka-table/actionCreators';
import { kaReducer, Table } from 'ka-table';
import { kaPropsUtils } from 'ka-table/utils';
import CellText from 'ka-table/Components/CellText/CellText';

import {
  DataType,
  EditingMode,
  FilteringMode,
  SortingMode,
} from 'ka-table/enums';

const TreeModeDemo = () => {
  const [ii, setii] = useState('');
  console.log({ ii });
  const SelectionCell = ({
    rowKeyValue,
    dispatch,
    isSelectedRow,
    selectedRows,
  }) => {
    // setii(selectedRows);

    return (
      <input
        type="checkbox"
        checked={isSelectedRow}
        onChange={(event) => {
          if (event.nativeEvent.shiftKey) {
            dispatch(selectRowsRange(rowKeyValue, [...selectedRows].pop()));
            //  setii(rowKeyValue);
          } else if (event.currentTarget.checked) {
            dispatch(selectRow(rowKeyValue));
            setii((pre) => [...pre, rowKeyValue]);
          } else {
            dispatch(deselectRow(rowKeyValue));
            //setii(rowKeyValue);
          }
        }}
      />
    );
  };

  const SelectionHeader = ({ dispatch, areAllRowsSelected }) => {
    return (
      <input
        type="checkbox"
        checked={areAllRowsSelected}
        onChange={(event) => {
          if (event.currentTarget.checked) {
            dispatch(selectAllFilteredRows()); // also available: selectAllVisibleRows(), selectAllRows()
          } else {
            dispatch(deselectAllFilteredRows()); // also available: deselectAllVisibleRows(), deselectAllRows()
          }
        }}
      />
    );
  };
  const data = [
    { treeGroupId: null, id: 1, name: 'Department A', productivity: 5 },
    { treeGroupId: 1, id: 2, name: 'Mike Wazowski', productivity: 2 },
    { treeGroupId: 1, id: 3, name: 'Billi Bob', productivity: 3 },
    { treeGroupId: null, id: 4, name: 'Department B', productivity: 7 },
    { treeGroupId: 4, id: 5, name: 'Tom Williams', productivity: 2 },
    { treeGroupId: 4, id: 6, name: 'Kurt Cobain', productivity: 5 },
    { treeGroupId: null, id: 7, name: 'Department C', productivity: 11 },
    { treeGroupId: 10, id: 8, name: 'Sunny Fox', productivity: 2 },
    { treeGroupId: 10, id: 9, name: 'Marshall Bruce', productivity: 5 },
    { treeGroupId: 7, id: 10, name: 'Squad A', productivity: 7 },
    { treeGroupId: 7, id: 11, name: 'Squad B', productivity: 4 },
    { treeGroupId: 11, id: 12, name: 'Alex Thomson', productivity: 1 },
    { treeGroupId: 11, id: 13, name: 'Mike Griffinson', productivity: 3 },
  ];

  const tablePropsInit = {
    columns: [
      {
        key: 'selection-cell',
      },
      {
        key: 'name',
        title: 'Name',
        dataType: DataType.String,
      },
      { key: 'productivity', title: 'Productivity', dataType: DataType.Number },
    ],
    data,
    filteringMode: FilteringMode.FilterRow,
    treeGroupKeyField: 'treeGroupId',
    editingMode: EditingMode.Cell,

    treeGroupsExpanded: [7, 11],
    rowKeyField: 'id',
    sortingMode: SortingMode.Single,

    format: ({ column, value }) => {
      if (column.key === 'Productivity') {
        return `$${value}`;
      }
    },
  };
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const [selectedchange, setselectedchange] = useState('');
  console.log(selectedchange);

  const dispatch = (action) => {
    console.log(action);
    changeTableProps((prevState) => kaReducer(prevState, action));
  };
  const handlechange = (e) => {
    setselectedchange(e.target.value);
    console.log({ ii });

    changeTableProps((prevState) =>
      kaReducer(prevState, {
        columnKey: 'name',
        rowKeyValue: 4,
        type: 'UpdateCellValue',
        value: 'Department hhhh55',
      })
    );
  };

  return (
    <>
      <input value={selectedchange} onChange={handlechange}></input>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={{
          cell: {
            content: (props) => {
              if (props.column.key === 'selection-cell') {
                return <CellText {...props} />;
              }
            },
          },
          cellText: {
            content: (props) => {
              if (props.column.key === 'selection-cell') {
                return <SelectionCell {...props} />;
              }
            },
          },
          filterRowCell: {
            content: (props) => {
              if (props.column.key === 'selection-cell') {
                return <></>;
              }
            },
          },

          headCell: {
            content: (props) => {
              if (props.column.key === 'selection-cell') {
                return (
                  <SelectionHeader
                    {...props}
                    areAllRowsSelected={kaPropsUtils.areAllFilteredRowsSelected(
                      tableProps
                    )}
                    // areAllRowsSelected={kaPropsUtils.areAllVisibleRowsSelected(tableProps)}
                  />
                );
              }
            },
          },
        }}
      />
    </>
  );
};

export default TreeModeDemo;
