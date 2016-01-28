$(document).ready(init);
var $newItem, $nameInput, $descInput, $priceInput;
var $myModal = $('#myModal');
var $nameInput = $('#nameInput');
var $descInput = $('#descInput');
var $priceInput = $('#priceInput');
var $qtyInput = $('#qtyInput');
var state;
var $id;

function init() {
  
  $('#addLink').on('click', function(){
    $myModal.modal('show');
    $('.modal-title').text('Add To List');
    state = 'add';
  })

  $('#myModal').on('click', '#saveButton', saveModal)

  $('div').on('click', '.delete', deleteItem)
  $('div').on('click', '.edit', editItem)
}

function editItem() {
  $myModal.modal('show');
  $('.modal-title').text('Edit Item');
  state = 'edit';
  $id = $(this).closest('tr').data('_id');

  $nameInput.val();

  var description = $descInput.val();
  var price = $priceInput.val();
  var quantity = $qtyInput.val();


}

function saveModal(){
  var name = $nameInput.val();
  var description = $descInput.val();
  var price = $priceInput.val();
  var quantity = $qtyInput.val();
  


  var newItem = {
    name: name,
    price: price,
    description: description,
    quantity: quantity
  }

  if(state === 'add'){
    $.post('/addItem', newItem).done(function(data){
      $.get('/items').done(function(data){
        drawTable();
      })
     }) ;
  } else {
    $.ajax({
      url: `/items/${$id}`,
      type: 'PUT',
      data: newItem
    })
    .done(function(data){
      drawTable();
      // drawTable(data);
      })
   }

    $nameInput.val(" ");
    $descInput.val(" ");
    $priceInput.val(" ");
    $qtyInput.val(" ");
    $myModal.modal('hide');

  console.log(name, description, price);
}

function drawTable() {
  $.get('/items').done(function(data){
    $('#tableBody').empty();
     var trArray = [];
     data.map(function(item){
      var $nameTd = $('<td>').text(item.name);
      var $descTd = $('<td>').text(item.description);
      var $priceTd = $('<td>').text(item.price);
      var $qtyTd = $('<td>').text(item.quantity);
      var $editTd = $('<td>').append($('<a>').addClass('edit').text('Edit'));
      var $removeTd = $('<td>').append($('<a>').addClass('delete').text('Delete'));
      var $tr = $('<tr>').append($nameTd, $descTd, $priceTd, $qtyTd, $editTd, $removeTd ).attr('data-_id', item._id);
      trArray.push($tr);
     })
     $('#tableBody').append(trArray);
  })
}

function deleteItem(){
  var item = $(this).closest('tr');
  var id = $(this).closest('tr').data('_id');
  
  $.ajax({
    url: `/items/${id}`,
    type: 'DELETE',
    success: function(data){
      console.log(data);
      item.remove();

      }
    })
}