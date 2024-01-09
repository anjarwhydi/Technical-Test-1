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
      url: "https://localhost:7155/api/Penjualan",
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
        data: "produkID",
      },
      {
        data: "namaProduk",
      },
      {
        data: "jumlah",
      },
      {
        data: "total",
        render: function (data) {
          // Format angka ke format mata uang Rupiah
          var formattedTotal = formatRupiah(data, "Rp. ");

          return formattedTotal;
        },
      },
      {
        data: "tanggalPenjualan",
        render: function (data) {
          var date = new Date(data);
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          var formattedDate =
            (day < 10 ? "0" : "") +
            day +
            "/" +
            (month < 10 ? "0" : "") +
            month +
            "/" +
            year;

          return formattedDate;
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

  function Produk() {
    $.ajax({
      url: "https://localhost:7155/api/Produk",
      type: "GET",
      dataType: "json",
      dataSrc: "data",
      success: function (response) {
        var select = $("#inputProduk");
        select.empty();

        select.append(
          $("<option>", {
            value: "",
            text: "Choose...",
          })
        );

        response.data.forEach(function (produk) {
          select.append(
            $("<option>", {
              value: produk.id,
              text: produk.namaProduk,
            })
          );
        });
      },
    });
  }
  Produk();
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
  $("#inputProduk").val("");
  $("#jumlah").val("");
  $("#date").val("");
  $("#save-button").show();
  $("#update-button").hide();
  $("#input-penjualanid").hide();
}

function Save() {
  // Mendapatkan data dari form input
  var produkID = $("#inputProduk").val();
  var jumlah = $("#jumlah").val();
  var date = $("#date").val();

  var Penjualan = {
    produkID: produkID,
    jumlah: jumlah,
    tanggalPenjualan: date,
  };

  // Mengirim data karyawan baru ke server
  $.ajax({
    url: "https://localhost:7155/api/Penjualan",
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(Penjualan),
    success: function () {
      Swal.fire({
        title: "Success",
        text: "Penjualan has been added successfully",
        icon: "success",
      });
      $("#datatable").DataTable().ajax.reload();
      $("#Modal").modal("hide");
      $("#inputProduk").val("");
      $("#jumlah").val("");
      $("#date").val("");
      $("#input-penjualanid").hide();
      $("#save-button").show();
      $("#update-button").hide();
    },
    error: function () {
      Swal.fire({
        title: "Error",
        text: "An error occurred while adding the penjualan",
        icon: "error",
      });
    },
  });
}

function GetById(rowId) {
  $.ajax({
    url: "https://localhost:7155/api/Penjualan/" + rowId,
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    dataSrc: "data",
    success: function (result) {
      var obj = result.data;
      $("#save-button").hide();
      $("#update-button").show();
      $("#input-penjualanid").show();
      $("#penjualanid").val(obj.id);
      $("#inputProduk").val(obj.produkID);
      $("#jumlah").val(obj.jumlah);
      var formattedDate = new Date(obj.tanggalPenjualan);
      formattedDate.setDate(formattedDate.getDate() + 1);
      var modifiedFormattedDate = formattedDate.toISOString().split("T")[0];
      $("#date").val(modifiedFormattedDate);
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

function Update() {
  // Mendapatkan data dari form input
  var id = $("#penjualanid").val();
  var produkID = $("#inputProduk").val();
  var jumlah = $("#jumlah").val();
  var date = $("#date").val();
  console.log(date);
  var Penjualan = {
    produkID: produkID,
    jumlah: jumlah,
    tanggalPenjualan: date,
  };

  $.ajax({
    url: "https://localhost:7155/api/Penjualan/" + id,
    type: "PUT",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(Penjualan),
    success: function () {
      Swal.fire({
        title: "Success",
        text: "Penjualan has been updated successfully",
        icon: "success",
      });
      $("#datatable").DataTable().ajax.reload();
      $("#Modal").modal("hide");
    },
    error: function () {
      Swal.fire({
        title: "Error",
        text: "An error occurred while updating penjualan",
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
        url: "https://localhost:7155/api/Penjualan/" + rowId,
        type: "DELETE",
        contentType: "application/json",
        dataType: "json",
        success: function () {
          Swal.fire("Deleted!", "Your penjualan has been deleted.", "success");
          $("#datatable").DataTable().ajax.reload();
        },
        error: function () {
          Swal.fire(
            "Error!",
            "An error occurred while deleting the penjualan.",
            "error"
          );
        },
      });
    }
  });
}
