const dsnv = new DanhSachNhanVien();
const validation = new Validation();


function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}

function getLocalStorage() {
    var dataLocal = JSON.parse(localStorage.getItem("DSNV"));
    if (dataLocal !== null) {
        hienThiTable(dataLocal);
        dsnv.mangNV = dataLocal;
    }
}
getLocalStorage();

function themNhanVien() {
    var ma = document.getElementById("tknv").value;
    var ten = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var matKhau = document.getElementById("password1").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luongCB = document.getElementById("luongCB").value;
    var chucVu = document.getElementById("chucvu").value;
    var gioLamViec = document.getElementById("gioLam").value;

    console.log(ma, ten, email, matKhau, ngayLam, luongCB, chucVu, gioLamViec);
    var isValid = true;

    isValid &= validation.checkEmpty(ma, "tbTKNV", "Mã sinh viên không được để trống") && validation.checkNumInput(ma, "tbTKNV", "Mã sinh viên tối đa 4-6 ký số") && validation.checkID(ma, "tbTKNV", "Mã sinh viên không được trùng",dsnv.mangNV);

    isValid &= validation.checkEmpty(ten, "tbTen", "Tên sinh viên không được để trống") && validation.checkName(ten, "tbTen", "Tên sinh viên phải là chữ");

    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống") && validation.checkEmail(email, "tbEmail", "Email phải đúng định dạng");

    isValid &= validation.checkEmpty(matKhau, "tbMatKhau", "Mật khẩu không được để trống") && validation.checkPassword(matKhau, "tbMatKhau", "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)");

    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống") && validation.checkDate(ngayLam, "tbNgay", "Ngày làm theo định dạng mm/dd/yyyy");

    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Lương cơ bản không được để trống") && validation.checkSalary(luongCB, "tbLuongCB", "Lương cơ bản 1.000.000 - 20.000.000");

    isValid &= validation.checkPosition(chucVu, "tbChucVu", "Chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)");

    isValid &= validation.checkEmpty(gioLamViec, "tbGiolam", "Số giờ làm việc không được để trống") && validation.checkWorkHour(gioLamViec, "tbGiolam", "Số giờ làm trong tháng 80 - 200 giờ");

    if (isValid) {
        var nv = new NhanVien(ma, ten, email, matKhau, ngayLam, luongCB, chucVu, gioLamViec);
        console.log(nv);
        dsnv.themNV(nv);
        setLocalStorage();
        hienThiTable(dsnv.mangNV);
    }

}


function hienThiTable(mang) {
    var content = "";
    mang.map(function (nv, index) {

        var tongLuong = 0;
        if (nv.chucVu == "Sếp") {
            tongLuong = nv.luongCoBan * 3;
        }
        if (nv.chucVu == "Trưởng phòng") {
            tongLuong = nv.luongCoBan * 2;
        }
        if (nv.chucVu == "Nhân viên") {
            tongLuong = nv.luongCoBan;
        }

        var xepLoai = "";
        if (nv.soGioLamTrongThang < 160) {
            xepLoai = "Trung Bình";
        }
        if (nv.soGioLamTrongThang >= 160) {
            xepLoai = "Khá";
        }
        if (nv.soGioLamTrongThang >= 176) {
            xepLoai = "Giỏi";
        }
        if (nv.soGioLamTrongThang >= 192) {
            xepLoai = "Xuất sắc";
        }

        var trNV = `<tr>
            <td>${nv.maNhanVien}</td>
            <td>${nv.tenNhanVien}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLamNV}</td>
            <td>${nv.chucVu}</td>
            <td>${tongLuong}</td>
            <td>${xepLoai}</td>
            <td>
            <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button>
            <button class="btn btn-info" onclick="xemThongTin('${nv.maNhanVien}')" >Xem</button>
        </td>
        </tr>`;
        content += trNV;
    })
    document.getElementById("tableDanhSach").innerHTML = content;
}

function xoaNhanVien(ma) {
    dsnv.xoaNV(ma);
    hienThiTable(dsnv.mangNV);
    setLocalStorage();
}

function xemThongTin(ma) {
    var indexFind = dsnv.timIndex(ma);
    if (indexFind > -1) {
        var nvFind = dsnv.mangNV[indexFind]

        document.getElementById("tknv").value = nvFind.maNhanVien;
        document.getElementById("tknv").disabled = true;
        document.getElementById("name").value = nvFind.tenNhanVien;
        document.getElementById("email").value = nvFind.email;
        document.getElementById("password1").value = nvFind.matKhauNV;
        document.getElementById("datepicker").value = nvFind.ngayLamNV;
        document.getElementById("luongCB").value = nvFind.luongCoBan;
        document.getElementById("chucvu").value = nvFind.chucVu;
        document.getElementById("gioLam").value = nvFind.soGioLamTrongThang;
    }
}

function capNhatNV(ma) {
    var ma = document.getElementById("tknv").value;
    var ten = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var matKhau = document.getElementById("password1").value;
    var ngayLam = document.getElementById("datepicker").value;
    var luongCB = document.getElementById("luongCB").value;
    var chucVu = document.getElementById("chucvu").value;
    var gioLamViec = document.getElementById("gioLam").value;

    var nv = new NhanVien(ma, ten, email, matKhau, ngayLam, luongCB, chucVu, gioLamViec);

    var result = dsnv.capNhat(nv);
    if (result) {
        setLocalStorage();
        hienThiTable(dsnv.mangNV);
        resetForm();
    } else {
        //false
        alert("Cập nhật thất bại")
    }
}

    document.getElementById("searchName").onkeyup = function(){
// document.getElementById("btnTimNV").onclick = function(){
   
        var tuTim = document.getElementById("searchName").value;
        var mangTK =  dsnv.timKiemTheoTen(tuTim);
        hienThiTable(mangTK);
    }



