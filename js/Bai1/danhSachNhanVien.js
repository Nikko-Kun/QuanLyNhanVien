
function DanhSachNhanVien() {
    this.mangNV = [];

    this.themNV = function (nv) {
        this.mangNV.push(nv);
    };

    this.timIndex = function (ma) {
        var indexFind = -1;
        this.mangNV.map(function (nv, index) {
            if (nv.maNhanVien === ma) {
                indexFind = index;
            }
        });
        console.log(indexFind);
        return indexFind;
    };
    this.xoaNV = function (ma) {
        var index = this.timIndex(ma);
        console.log(index);
        if (index > -1) {
            this.mangNV.splice(index, 1);
        }
    }

    this.capNhat = function (nv) {
        var indexFind = this.timIndex(nv.maNhanVien);
        if (indexFind > -1) {
            dsnv.mangNV[indexFind] = nv;
            return true;
        } else {
            return false;
        }
    }
}
DanhSachNhanVien.prototype.timKiemTheoTen = function(tuTim) {
    var mangTK = [];
    var tuTimThuong = tuTim.toLowerCase();
    var tuTimReplace = tuTimThuong.replace(/\s/g, "");
    this.mangNV.map(function(nv,index) {
        var tenThuong = nv.tenNhanVien.toLowerCase();
        var tenReplace = tenThuong.replace(/\s/g, "");
        var result = tenReplace.indexOf(tuTimReplace);
        if (result > -1) {
            mangTK.push(nv);
        }
    });
    return mangTK;
}
