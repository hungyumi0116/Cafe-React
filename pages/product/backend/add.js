import React, { useState } from 'react';
import { useRouter } from 'next/router';
import BeNavbar from '@/components/layout/default-layout/backendbar';

export default function Add() {
  const type = [
    { label: '精選咖啡', value: '精選咖啡' },
    { label: '季節限定', value: '季節限定' },
    { label: '推薦送禮', value: '推薦送禮' },
  ];
  const country = [
    { label: '台灣', value: '台灣' },
    { label: '衣索比亞', value: '衣索比亞' },
    { label: '肯亞', value: '肯亞' },
    { label: '巴拿馬', value: '巴拿馬' },
    { label: '哥斯大黎加', value: '哥斯大黎加' },
    { label: '瓜地馬拉', value: '瓜地馬拉' },
    { label: '哥倫比亞', value: '哥倫比亞' },
    { label: '巴西', value: '巴西' },
    { label: '祕魯', value: '祕魯' },
  ];
  const breed = [
    { label: '阿拉比卡', value: '阿拉比卡' },
    { label: '卡杜拉', value: '卡杜拉' },
    { label: '藝妓', value: '藝妓' },
    { label: '帝比卡', value: '帝比卡' },
  ];
  const processes = [
    { label: '水洗處理', value: '水洗處理' },
    { label: '日曬處理', value: '日曬處理' },
    { label: '半水洗處理', value: '半水洗處理' },
    { label: '半日曬處理', value: '半日曬處理' },
    { label: '葡萄乾蜜處理', value: '葡萄乾蜜處理' },
  ];
  const roast = [
    { label: '深烘焙', value: '深烘焙' },
    { label: '中烘焙', value: '中烘焙' },
    { label: '淺烘焙', value: '淺烘焙' },
  ];

  const router = useRouter();
  const [imageFile1, setImageFile1] = useState('');
  const [imageFile2, setImageFile2] = useState(null);
  const [imageFile3, setImageFile3] = useState(null);
  const [imageFile4, setImageFile4] = useState(null);
  const [imageFile5, setImageFile5] = useState(null);

  const [myForm, setMyForm] = useState({
    p_name: '',
    p_price: 0,
    p_discount: 0,
    p_type: type[0].value,
    p_country: country[0].value,
    p_breed: breed[0].value,
    p_process: processes[0].value,
    p_roast: roast[0].value,
    p_intro: '',
    p_date: '',
    p_stock: 0,
    p_sold: 0,
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      switch (e.target.name) {
        case 'p_pic1':
          setImageFile1(file);
          break;
        case 'p_pic2':
          setImageFile2(file);
          break;
        case 'p_pic3':
          setImageFile3(file);
          break;
        case 'p_pic4':
          setImageFile4(file);
          break;
        case 'p_pic5':
          setImageFile5(file);
      }
      console.log('欄位', e.target.name, file);

      // 可以用来预览图像
    }
  };

  const onChange = (e) => {
    const newForm = { ...myForm, [e.target.name]: e.target.value };
    console.log('newform', newForm);

    setMyForm(newForm);
  };

  const onSubmit = async (e) => {
    console.log('MYFORM', myForm);
    e.preventDefault(); // 不要傳統的方式送出表單
    if (myForm.p_name.length < 2) {
      alert('請輸入正確的商品名稱');
      return;
    }
    try {
      console.log('MYFORM', myForm);
      const formData = new FormData();
      formData.append('p_name', myForm.p_name);
      formData.append('p_price', myForm.p_price);
      formData.append('p_discount', myForm.p_discount);
      formData.append('p_type', myForm.p_type);
      formData.append('p_country', myForm.p_country);
      formData.append('p_breed', myForm.p_breed);
      formData.append('p_process', myForm.p_process);
      formData.append('p_roast', myForm.p_roast);
      formData.append('p_intro', myForm.p_intro);
      formData.append('p_stock', myForm.p_stock);
      formData.append('p_sold', myForm.p_sold);
      formData.append('p_pic1', imageFile1); // 'image' 是后端接收的字段名
      formData.append('p_pic2', imageFile2);
      formData.append('p_pic3', imageFile3);
      formData.append('p_pic4', imageFile4);
      formData.append('p_pic5', imageFile5);

      const r = await fetch('http://localhost:3005/api/product_list/api', {
        method: 'POST',
        body: formData,
      });
      const result = await r.json();
      console.log('結果', result);
      console.log('資料fd', formData);
      if (result.success) {
        router.push('/product/backend'); // 跳到列表頁
      } else {
        alert('新增資料失敗');
      }
    } catch (ex) {
      console.log('EX', ex);
    }
  };

  return (
    <>
      <BeNavbar title="新增通訊錄 - 小新的網站"></BeNavbar>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">新增商品</h5>

              <form name="form1" onSubmit={onSubmit} noValidate>
                {/* 名稱 */}
                <div className="mb-3">
                  <label htmlFor="p_name" className="form-label">
                    商品名稱
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="p_name"
                    id="p_name"
                    required
                    value={myForm.p_name}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>
                {/* 價格 */}
                <div className="mb-3">
                  <label htmlFor="p_price" className="form-label">
                    價格
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="p_price"
                    id="p_price"
                    required
                    value={myForm.p_price}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>
                {/* 折價 */}
                <div className="mb-3">
                  <label htmlFor="p_discount" className="form-label">
                    折扣後價格
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="p_discount"
                    id="p_discount"
                    required
                    value={myForm.p_discount}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>
                {/* 分類 */}
                <div className="mb-3">
                  <label htmlFor="p_type" className="form-label">
                    產品分類
                  </label>

                  <select
                    className="form-control"
                    name="p_type"
                    value={myForm.p_type}
                    onChange={onChange}
                  >
                    {type.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* 產地 */}
                <div className="mb-3">
                  <label htmlFor="p_country" className="form-label">
                    產品產地
                  </label>

                  <select
                    className="form-control"
                    name="p_country"
                    value={myForm.p_country}
                    onChange={onChange}
                  >
                    {country.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* 品種 */}
                <div className="mb-3">
                  <label htmlFor="p_roast" className="form-label">
                    品種
                  </label>

                  <select
                    className="form-control"
                    name="p_breed"
                    value={myForm.p_breed}
                    onChange={onChange}
                  >
                    {breed.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* 處理法 */}
                <div className="mb-3">
                  <label htmlFor="p_process" className="form-label">
                    處理法
                  </label>

                  <select
                    className="form-control"
                    name="p_process"
                    value={myForm.p_process}
                    onChange={onChange}
                  >
                    {processes.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 烘焙程度 */}
                <div className="mb-3">
                  <label htmlFor="p_roast" className="form-label">
                    烘焙程度
                  </label>

                  <select
                    className="form-control"
                    name="p_roast"
                    value={myForm.p_roast}
                    onChange={onChange}
                  >
                    {roast.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* 介紹 */}
                <div className="mb-3">
                  <label htmlFor="p_intro" className="form-label">
                    商品介紹
                  </label>
                  <input
                    type="textarea"
                    rows={4}
                    cols={40}
                    className="form-control"
                    name="p_intro"
                    id="p_intro"
                    required
                    value={myForm.p_intro}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>
                {/* 庫存 */}
                <div className="mb-3">
                  <label htmlFor="p_stock" className="form-label">
                    商品庫存
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="p_stock"
                    id="p_stock"
                    required
                    value={myForm.p_stock}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>
                {/* 銷量 */}
                <div className="mb-3">
                  <label htmlFor="p_sold" className="form-label">
                    商品銷量
                  </label>
                  <input
                    disabled
                    type="number"
                    className="form-control"
                    name="p_sold"
                    id="p_sold"
                    required
                    value={myForm.p_sold}
                    onChange={onChange}
                  />
                  <div className="form-text"></div>
                </div>
                {/* 照片 */}
                <div className="mb-3">
                  <label htmlFor="p_pic1" className="form-label">
                    商品照片
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    method="POST"
                    className="form-control"
                    name="p_pic1"
                    id="p_pic1"
                    required
                    value={myForm.p_pic1}
                    onChange={handleFileChange}
                  />
                  <div className="form-text"></div>
                </div>
                {/* 照片 2*/}
                <div className="mb-3">
                  <label htmlFor="p_pic2" className="form-label">
                    商品照片
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    method="POST"
                    className="form-control"
                    name="p_pic2"
                    id="p_pic2"
                    required
                    value={myForm.p_pic2}
                    onChange={handleFileChange}
                  />
                  <div className="form-text"></div>
                </div>
                {/* 照片 3*/}
                <div className="mb-3">
                  <label htmlFor="p_pic3" className="form-label">
                    商品照片
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    method="POST"
                    className="form-control"
                    name="p_pic3"
                    id="p_pic3"
                    required
                    value={myForm.p_pic3}
                    onChange={handleFileChange}
                  />
                  <div className="form-text"></div>
                </div>
                {/* 照片 4*/}
                <div className="mb-3">
                  <label htmlFor="p_pic4" className="form-label">
                    商品照片
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    method="POST"
                    className="form-control"
                    name="p_pic4"
                    id="p_pic4"
                    required
                    value={myForm.p_pic4}
                    onChange={handleFileChange}
                  />
                  <div className="form-text"></div>
                </div>
                {/* 照片 5*/}
                <div className="mb-3">
                  <label htmlFor="p_pic4" className="form-label">
                    商品照片
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    method="POST"
                    className="form-control"
                    name="p_pic5"
                    id="p_pic5"
                    required
                    value={myForm.p_pic5}
                    onChange={handleFileChange}
                  />
                  <div className="form-text"></div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
