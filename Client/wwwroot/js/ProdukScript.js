$(document).ready(function () {
  var currentUrl = window.location.href;
  $(".nav-treeview a").each(function () {
    if (currentUrl.indexOf($(this).attr("href")) > -1) {
      $(this).addClass("active");
    }
  });

  // Inisialisasi DataTable
  $("#datatable").DataTable({
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: true,
    info: true,
    autoWidth: false,
    responsive: true,
    ajax: {
      url: "https://localhost:7155/api/Produk",
      type: "GET",
      datatype: "json",
      dataSrc: "data",
    },
    order: [[0, "asc"]],
    columns: [
      {
        data: null,
        orderable: false,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      {
        data: "id",
      },
      {
        data: "namaProduk",
      },
      {
        data: "harga",
        render: function (data) {
          var formattedTotal = formatRupiah(data, "Rp. ");
          return formattedTotal;
        },
      },
      {
        data: null,
        orderable: false,
        render: function (data, type, row) {
          return (
            '<button type="button" class="btn btn-warning btn-sm edit-button" data-operation="edit" data-target="#Modal" data-toggle="modal" data-tooltip="tooltip" data-placement="left" onclick="GetById(\'' +
            row.id +
            '\');" title="Edit"><i class="fas fa-edit"></i></button>' +
            " " +
            '<button type="button" class="btn btn-danger btn-sm remove-button" data-tooltip="tooltip" data-placement="right" onclick="Delete(\'' +
            row.id +
            '\')" title="Delete"><i class="fas fa-trash"></i></button>'
          );
        },
      },
    ],
  });
});
function formatRupiah(angka, prefix) {
  var numberString = angka.toString();
  var split = numberString.split(",");
  var sisa = split[0].length % 3;
  var rupiah = split[0].substr(0, sisa);
  var ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);

  if (ribuan) {
    var separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return prefix === undefined ? rupiah : rupiah ? prefix + rupiah : "";
}

function clearSave() {
  $("#produkid").val("");
  $("#produk").val("");
  $("#harga").val("");
  $("#save-button").show();
  $("#update-button").hide();
  $("#input-produkid").hide();
}

function Save() {
  var produk = $("#produk").val();
  var harga = $("#harga").val();

  var Produk = {
    namaProduk: produk,
    harga: harga,
  };

  $.ajax({
    url: "https://localhost:7155/api/Produk",
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(Produk),
    success: function () {
      Swal.fire({
        title: "Success",
        text: "Produk has been added successfully",
        icon: "success",
      });
      $("#datatable").DataTable().ajax.reload();
      $("#Modal").modal("hide");
      clearSave();
    },
    error: function () {
      Swal.fire({
        title: "Error",
        text: "An error occurred while adding the produk",
        icon: "error",
      });
    },
  });
}

function GetById(rowId) {
  $.ajax({
    url: "https://localhost:7155/api/Produk/" + rowId,
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    success: function (result) {
      var obj = result.data;
      $("#save-button").hide();
      $("#update-button").show();
      $("#input-produkid").show();
      $("#produkid").val(obj.id);
      $("#produk").val(obj.namaProduk);
      $("#harga").val(obj.harga);
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

function Update() {
  var id = $("#produkid").val();
  var produk = $("#produk").val();
  var harga = $("#harga").val();
  var Produk = {
    namaProduk: produk,
    harga: harga,
  };

  $.ajax({
    url: "https://localhost:7155/api/Produk/" + id,
    type: "PUT",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(Produk),
    success: function () {
      Swal.fire({
        title: "Success",
        text: "Produk has been updated successfully",
        icon: "success",
      });
      $("#datatable").DataTable().ajax.reload();
      $("#Modal").modal("hide");
      clearSave();
    },
    error: function () {
      Swal.fire({
        title: "Error",
        text: "An error occurred while updating produk",
        icon: "error",
      });
    },
  });
}

function Delete(rowId) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: "https://localhost:7155/api/Produk/" + rowId,
        type: "DELETE",
        contentType: "application/json",
        dataType: "json",
        success: function () {
          Swal.fire("Deleted!", "Your produk has been deleted.", "success");
          $("#datatable").DataTable().ajax.reload();
        },
        error: function () {
          Swal.fire(
            "Error!",
            "An error occurred while deleting produk.",
            "error"
          );
        },
      });
    }
  });
}
