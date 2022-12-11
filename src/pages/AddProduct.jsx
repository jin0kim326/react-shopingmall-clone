import { Cloudinary } from '@cloudinary/url-gen';
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { useEffect } from 'react';

export default function AddProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();

  const cld = new Cloudinary();
  useEffect(() => {
    console.log(cld.getConfig());
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제품의 사진을 Cloudinary에 업로드 -> url획득

    const cloudinaryData = {};
    cloudinaryData.append('file', file);
    cloudinaryData.append('api_key');
    cloudinaryData.append('public_id');
    cloudinaryData.append('timestamp', new Date());
    cloudinaryData.append('signature');

    // Firebase에 새로운 제품 추가
  };
  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt='local file' />}
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='제품명'
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='가격'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='카테고리'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='설명'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='옵션들(콤마(,)로 구분)'
          required
          onChange={handleChange}
        />
        <Button text={'제품 등록하기'} />
      </form>
    </section>
  );
}
