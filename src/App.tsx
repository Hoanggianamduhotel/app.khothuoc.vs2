import React, { useState, useRef } from "react";

const KhoThuoc = () => {
  const [thuocList, setThuocList] = useState([
    {
      name: "Paracetamol",
      code: "12345",
      form: "Viên",
      route: "Uống",
      stock: 100,
      importPrice: 5000,
      retailPrice: 7000,
    },
    {
      name: "Aspirin",
      code: "67890",
      form: "Viên",
      route: "Uống",
      stock: 50,
      importPrice: 2000,
      retailPrice: 3500,
    },
    // Các thuốc khác...
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [newThuoc, setNewThuoc] = useState({
    name: "",
    code: "",
    form: "",
    route: "",
    stock: "",
    importPrice: "",
    retailPrice: "",
  });

  const inputRefs = {
    quantityToAddRef: useRef(null),
    newNameRef: useRef(null),
    newCodeRef: useRef(null),
    newFormRef: useRef(null),
    newRouteRef: useRef(null),
    newStockRef: useRef(null),
    newImportPriceRef: useRef(null),
    newRetailPriceRef: useRef(null),
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantityToAdd(e.target.value);
  };

  const handleAddQuantity = () => {
    const updatedList = thuocList.map((thuoc) => {
      if (
        thuoc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thuoc.code.includes(searchQuery)
      ) {
        const newStock = thuoc.stock + Number(quantityToAdd);
        return { ...thuoc, stock: newStock };
      }
      return thuoc;
    });
    setThuocList(updatedList);
    setQuantityToAdd(""); 
  };

  const handleAddNewThuoc = () => {
    setThuocList([...thuocList, newThuoc]);
    setNewThuoc({
      name: "",
      code: "",
      form: "",
      route: "",
      stock: "",
      importPrice: "",
      retailPrice: "",
    });
  };

  const handleEditThuoc = (index, field, value) => {
    const updatedList = [...thuocList];
    updatedList[index][field] = value;
    setThuocList(updatedList);
  };

  const filteredThuocList = thuocList.filter(
    (thuoc) =>
      thuoc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thuoc.code.includes(searchQuery)
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Kho Thuốc</h2>

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm thuốc"
          className="p-2 border rounded"
          onKeyDown={(e) => handleKeyDown(e, inputRefs.quantityToAddRef)}
        />
        <input
          ref={inputRefs.quantityToAddRef}
          type="number"
          value={quantityToAdd}
          onChange={handleQuantityChange}
          placeholder="Số lượng thêm"
          className="p-2 border rounded ml-2"
          onKeyDown={(e) => handleKeyDown(e, inputRefs.saveButtonRef)}
        />
        <button
          ref={inputRefs.saveButtonRef}
          onClick={handleAddQuantity}
          className="bg-blue-600 text-white p-2 rounded ml-2"
        >
          Lưu
        </button>
      </div>

      {/* Bảng thuốc */}
      <table className="min-w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Tên Thuốc</th>
            <th className="px-4 py-2">Mã Thuốc</th>
            <th className="px-4 py-2">Dạng</th>
            <th className="px-4 py-2">Đường Dùng</th>
            <th className="px-4 py-2">Số Lượng Tồn</th>
            <th className="px-4 py-2">Giá Nhập</th>
            <th className="px-4 py-2">Giá Bán Lẻ</th>
            <th className="px-4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredThuocList.map((thuoc, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={thuoc.name}
                  onChange={(e) => handleEditThuoc(index, "name", e.target.value)}
                  className="p-2 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={thuoc.code}
                  onChange={(e) => handleEditThuoc(index, "code", e.target.value)}
                  className="p-2 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={thuoc.form}
                  onChange={(e) => handleEditThuoc(index, "form", e.target.value)}
                  className="p-2 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={thuoc.route}
                  onChange={(e) => handleEditThuoc(index, "route", e.target.value)}
                  className="p-2 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={thuoc.stock}
                  onChange={(e) => handleEditThuoc(index, "stock", e.target.value)}
                  className="p-2 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={thuoc.importPrice}
                  onChange={(e) => handleEditThuoc(index, "importPrice", e.target.value)}
                  className="p-2 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={thuoc.retailPrice}
                  onChange={(e) => handleEditThuoc(index, "retailPrice", e.target.value)}
                  className="p-2 border rounded"
                />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => alert("Chỉnh sửa thuốc")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-2"
                >
                  Chỉnh sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Thêm thuốc mới */}
      <div className="mb-4">
        <h3 className="text-xl mb-2">Thêm Thuốc Mới</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            ref={inputRefs.newNameRef}
            type="text"
            value={newThuoc.name}
            onChange={(e) => setNewThuoc({ ...newThuoc, name: e.target.value })}
            placeholder="Tên Thuốc"
            className="p-2 border rounded"
            onKeyDown={(e) => handleKeyDown(e, inputRefs.newCodeRef)}
          />
          <input
            ref={inputRefs.newCodeRef}
            type="text"
            value={newThuoc.code}
            onChange={(e) => setNewThuoc({ ...newThuoc, code: e.target.value })}
            placeholder="Mã Thuốc"
            className="p-2 border rounded"
            onKeyDown={(e) => handleKeyDown(e, inputRefs.newFormRef)}
          />
          <input
            ref={inputRefs.newFormRef}
            type="text"
            value={newThuoc.form}
            onChange={(e) => setNewThuoc({ ...newThuoc, form: e.target.value })}
            placeholder="Dạng"
            className="p-2 border rounded"
            onKeyDown={(e) => handleKeyDown(e, inputRefs.newRouteRef)}
          />
          <input
            ref={inputRefs.newRouteRef}
            type="text"
            value={newThuoc.route}
            onChange={(e) => setNewThuoc({ ...newThuoc, route: e.target.value })}
            placeholder="Đường Dùng"
            className="p-2 border rounded"
            onKeyDown={(e) => handleKeyDown(e, inputRefs.newStockRef)}
          />
          <input
            ref={inputRefs.newStockRef}
            type="number"
            value={newThuoc.stock}
            onChange={(e) => setNewThuoc({ ...newThuoc, stock: e.target.value })}
            placeholder="Số Lượng Tồn"
            className="p-2 border rounded"
            onKeyDown={(e) => handleKeyDown(e, inputRefs.newImportPriceRef)}
          />
          <input
            ref={inputRefs.newImportPriceRef}
            type="number"
            value={newThuoc.importPrice}
            onChange={(e) => setNewThuoc({ ...newThuoc, importPrice: e.target.value })}
            placeholder="Giá Nhập"
            className="p-2 border rounded"
            onKeyDown={(e) => handleKeyDown(e, inputRefs.newRetailPriceRef)}
          />
          <input
            ref={inputRefs.newRetailPriceRef}
            type="number"
            value={newThuoc.retailPrice}
            onChange={(e) => setNewThuoc({ ...newThuoc, retailPrice: e.target.value })}
            placeholder="Giá Bán Lẻ"
            className="p-2 border rounded"
            onKeyDown={(e) => handleKeyDown(e, inputRefs.addNewThuocButtonRef)}
          />
        </div>
        <button
          ref={inputRefs.addNewThuocButtonRef}
          onClick={handleAddNewThuoc}
          className="bg-green-600 text-white p-2 rounded mt-4"
        >
          Thêm Thuốc Mới
        </button>
      </div>
    </div>
  );
};

export default KhoThuoc;

