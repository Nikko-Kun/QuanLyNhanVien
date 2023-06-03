const validation = new Validation();

function layDanhSachNV() {
    axios({
        method: 'get',
        url: 'https://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
    }).then(function (result) {
        hienThiTable(result.data);
    }).catch(function (error) {
        console.log(error);
    });
}
layDanhSachNV();



function hienThiTable(mang) {
    var content = "";
    mang.map(function(nv,index) {

        // var tongLuong = 0;
        // if (nv.chucVu == "Sếp") {
        //     tongLuong = nv.luongCoBan * 3;
        // }
        // if (nv.chucVu == "Trưởng phòng") {
        //     tongLuong = nv.luongCoBan * 2;
        // } 
        // if (nv.chucVu == "Nhân viên"){
        //     tongLuong = nv.luongCoBan;
        // }

        var trNV = `<tr>
            <td>${nv.maNhanVien}</td>
            <td>${nv.tenNhanVien}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLamNV}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.xepLoaiNV}</td>
        </tr>`;
        content += trNV;
    
    })
    document.getElementById("tableDanhSach").innerHTML = content;
}


function themNhanVien() {
    var ma = document.getElementById("tknv").value;
    var ten = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var matKhau = document.getElementById("password1").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luongCB = document.getElementById("luongCB").value;
    var chucVu = document.getElementById("chucvu").value;
    var gioLamViec = document.getElementById("gioLam").value;

    console.log(ma,ten,email,matKhau,ngayLam,luongCB,chucVu,gioLamViec);
    var isValid = true;

    isValid &= validation.checkEmpty(ma,"tbTKNV","Mã sinh viên không được để trống") && validation.checkNumInput(ma,"tbTKNV","Mã sinh viên tối đa 4-6 ký số");

    isValid &= validation.checkEmpty(ten,"tbTen","Tên sinh viên không được để trống") && validation.checkName(ten,"tbTen","Tên sinh viên phải là chữ");

    isValid &= validation.checkEmpty(email,"tbEmail","Email không được để trống") && validation.checkEmail(email,"tbEmail","Email phải đúng định dạng");

    isValid &= validation.checkEmpty(matKhau,"tbMatKhau","Mật khẩu không được để trống") && validation.checkPassword(matKhau,"tbMatKhau","Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)");

    isValid &= validation.checkEmpty(ngayLam,"tbNgay","Ngày làm không được để trống") && validation.checkDate(ngayLam,"tbNgay","Ngày làm theo định dạng mm/dd/yyyy");

    isValid &= validation.checkEmpty(luongCB,"tbLuongCB","Lương cơ bản không được để trống") && validation.checkSalary(luongCB,"tbLuongCB","Lương cơ bản 1.000.000 - 20.000.000");

    isValid &= validation.checkPosition(chucVu,"tbChucVu","Phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)");

    isValid &= validation.checkEmpty(gioLamViec,"tbGiolam","Số giờ làm việc không được để trống") && validation.checkWorkHour(gioLamViec,"tbGiolam","Số giờ làm trong tháng 80 - 200 giờ");

    if (isValid) {
    var nv = new NhanVien(ma,ten,email,matKhau,ngayLam,luongCB,chucVu,gioLamViec);

    axios({
        method: 'post',
        url: 'https://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        data: nv
    }).then(function(result){
        alert("Thêm thành công");
        layDanhSachNV();
    }).catch(function(error){
        console.log(error);
    })
    }


}

function xoaSinhVien(ma) {
    axios({
      method: 'delete',
      url: `https://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maNhanVien=${ma}`
    }).then(function (result) {
      alert("Xóa thành công")
      layDanhSachNV();
    }).catch(function (error) {
      console.log(error)
    })
  }


  function capNhatNV() {
    var ma = document.getElementById("tknv").value;
    var ten = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var matKhau = document.getElementById("password").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luongCB = document.getElementById("luongCB").value;
    var chucVu = document.getElementById("chucvu").value;
    var gioLamViec = +document.getElementById("gioLam").value;

    var nv = new NhanVien(ma,ten,email,matKhau,ngayLam,luongCB,chucVu,gioLamViec);

    
    axios({
        method:"put",
        url: `https://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${ma}`,
        data:nv
      }).then(function(result){
        alert("Cập nhật thành công")
        layDanhSachNV();
      }).catch(function(error){
        console.log(error)
      })
    
  }

