# React Digital Grid

![Deploy Examples](https://github.com/miscalencu/Npm-React-Digital-Grid/workflows/Deploy%20Examples/badge.svg?branch=master)

This is a React DataGrid / DataTable component with features like:

- flexible formatting - Easily format columns with built-in classes: bold, italic, left, right, etc.. or totaly custom using your own written renderer functions.
- skins - 3 skins available: default, classic and bootstrap. You can also write your own skin, it's all about writing your own css file.
- pagination - Specify the total number of records, the page size and current page and paginator will automatically be rendered with links and actions for each page.
- sorting - Just specify if a column is `sortable` and automatically you will be able to click on it (with proper UI) and have proper events attached.
- expandable content - You want to have a `show more...` or `[+] details` feature on your rows? This is built-in and supports any kind of content, even another grid (sub-grid).
- selection - If set, you are able to select one or multiple rows. You can also use `Shift` or `Ctrl` to multi-select.
- events - You can specify what happens when you click on any of the cells in the grid. All data is available in the event parameters.

## Installing

```
npm install --save react-digital-grid
```

## Basic usage

```js
  import React from 'react';
  import { Grid, Column } from 'react-digital-grid';
  
  const Example = () => {
  
  // load your data here: data
  return (
    <Grid 
      data={data}
    > 
      <Column header='Id' className='left' field='guid' />
      <Column header='Name' className='bold' field='name' />
      <Column header='Company' className='bold' field='company' />
      <Column 
            header='Email' 
            field='email'
            renderer={item => {
              return <a href={`mailto:${item.email}`}>{item.email}</a>;
            }}
      />
    </Grid>
    );
   };
```

## Demos available here

A lot of examples available at: https://miscalencu.github.io/react-digital-grid/

## Parameters

| Parameter | Description |
| :--- | :--- |
| **Basic** ||
| `loading` | Sets if the grid should display a loading indicator. Defaults to 'false'. |
| `data` | The data that the grid should display. |
| `keyField` | The field name of the data elements that represents a unique key. |
| `dataCount` | The total records of the grid. This is not the count of the 'data' array, but total records for all pages. Used by the paginator to calculate total pages. |
| `pageNr` | Curtent page to display. Used by the paginator render. |
| `pageSize` | Current number of items to display on a page. Used by the paginator render. |
| `orderBy` | Initial 'Order By' field. |
| `orderDir` | Initial 'Order Dir' field. |
| `onStateChange` | Callback method called when the state of the grid (page, order by, order dir, etc...) is changed. Parameterd: (pageSize, pageNr, orderBy, orderDir). |
| **Formatting** ||
| `skin` | Skin of the grid. Can be: 'default', 'classic', 'bootstrap' or 'none'. Defalts to 'default'. |
| `emptyText` | Text to be displayed when there is no data to available. Defaults to 'No data available' |
| `footerText` | Text to be displayed in the bottom of the grid. Defaults to '' (empty). |
| `className` | Additional className of the grid table. Defaults to '' (empty). |
| `classNamesRenderer` | Method to compute additional className for each row. Parameters: see row events parameters. |
| `onCellClick` | Callback method to be called (if set) when clicking a column value. |
| `emptyPlaceholder` | Text to be displayed in each grid cell if the content is empty. |
| **Selection** ||
| `isSelectable` | Sets if the grid is selectable. It true, rows can be (multi)selected. Defaults for 'false'. |
| `showSelectionInfo` | Sets if the selection info is displayed in the footer of the grid. Defaults for 'false'. |
| `onSelectionChange` | Callback method called when the selection of the rows changed. Parameters: (selectedKeys, selectedItems, selectedLast) |
| **Expandable** ||
| `isExpandable` | Sets if the grid is expandable. If 'true' will display in the first column a [+] sign that expands the current row. Defaults to 'false'. |
| `expandedRowContent` | Method used to generate the content of an expanded column. Parameters: (item) |

## To be implemented

- frozen rows / first row.
- frozen columns / first column.
- improve plugins so you can extend the grid functionalities with your own.

## Info

Data in the examples was generated with https://www.json-generator.com/
