<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript">
  var spData = null;
  function create_data(json) {
      spData = json.feed.entry;
  }
  function draw_cell(tr, val){
      var td = $("<td/>");
      tr.append(td);
      td.append(val);
      return td;
  }
  function draw_row(table, rowData){
	  if (rowData == null) return null;
	  if (rowData.length == 0) return null;
	  var tr = $("<tr/>");
	  table.append(tr);
	  for(var c=0; c<rowData.length; c++) {
		  draw_cell(tr, rowData[c]);
	  }
	  return tr;
  }
  function draw_table(parent){
	  var table = $("<table/>");
	  parent.append(table);
	  return table;
  }
  function read_data(parent){
      var data = spData;
      var table = draw_table(parent);
      var rowData = [];
      for(var r=0; r<data.length; r++){
          var cell = data[r]["gs$cell"];
          var val = cell["$t"];
          if (cell.col == 1) {
              draw_row(table, rowData);
              rowData = [];
          }
          rowData.push(val);
      }
      draw_row(table, rowData);
  }
  $(document).ready(function(){
      read_data($("#data"));
  });

  </script>   
<script src="https://spreadsheets.google.com/feeds/cells/ # doc id here # /1/public/values?alt=json-in-script&callback=create_data"></script>
<style type="text/css">
  table {border-collapse: collapse; width: 100%;}
  th, td {border: thin solid black; padding: 3px;}
  tr.head th, tr.head td {background-color: #EDEDED; border-bottom: 4px double black;}
  span.linetitle {font-weight: bold;}
  div.lineclass {font-style: italic;}
  .title, .result {width: 80%;}
  .notes {width: 15%;}
  h1 {text-align: center;}
  body {margin: 12px; font-size: 12px;}
</style>
<style type="text/css" media="print">
  form {display: none;}
</style>
</head>
<body>
<h2>Title of the table</h2> 
<div id="data"/>
