# React Digital Grid

![Deploy Examples](https://github.com/miscalencu/Npm-React-Digital-Grid/workflows/Deploy%20Examples/badge.svg?branch=master)

This is a React DataGrid features like:

- flexible formatting
- skins
- pagination
- sorting
- expandable content
- selection
- events

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

## Demo available here

Check more examples at: https://miscalencu.github.io/react-digital-grid/

## Parameters

| Parameter | Description |
| :--- | :--- |
| Basic Parameters ||
| `loading` | Sets if the grid should display a loading indicator. Defaults to 'false'. |
| `data` | The data that the grid should display. |
| `keyField` | The field name of the data elements that represents a unique key. |
| `dataCount` | The total records of the grid. This is not the count of the 'data' array, but total records for all pages. Used by the paginator to calculate total pages. |
| `pageNr` | Curtent page to display. Used by the paginator render. |
| `pageSize` | Current number of items to display on a page. Used by the paginator render. |
| `orderBy` | Initial 'Order By' field. |
| `orderDir` | Initial 'Order Dir' field. |
| `onStateChange` | Callback method called when the state of the grid (page, order by, order dir, etc...) is changed. Parameterd: (pageSize, pageNr, orderBy, orderDir). |
| Formatting Parameters ||
| `skin` | Skin of the grid. Can be: 'default', 'classic', 'bootstrap' or 'none'. Defalts to 'default'. |
| `emptyText` | Text to be displayed when there is no data to available. Defaults to 'No data available' |
| `footerText` | Text to be displayed in the bottom of the grid. Defaults to '' (empty). |
| `className` | Additional className of the grid table. Defaults to '' (empty). |
| `classNamesRenderer` | Method to compute additional className for each row. Parameters: see row events parameters. |
| `onCellClick` | Callback method to be called (if set) when clicking a column value. |
| `emptyPlaceholder` | Text to be displayed in each grid cell if the content is empty. |
| Rows Selection Parameters ||
| `isSelectable` | Sets if the grid is selectable. It true, rows can be (multi)selected. Defaults for 'false'. |
| `showSelectionInfo` | Sets if the selection info is displayed in the footer of the grid. Defaults for 'false'. |
| `onSelectionChange` | Callback method called when the selection of the rows changed. Parameters: (selectedKeys, selectedItems, selectedLast) |
| Expandable Row Parameters ||
| `isExpandable` | Sets if the grid is expandable. If 'true' will display in the first column a [+] sign that expands the current row. Defaults to 'false'. |
| `expandedRowContent` | Method used to generate the content of an expanded column. Parameters: (item) |

## Info

Data in the examples was generated with https://www.json-generator.com/
