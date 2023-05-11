import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { fetchCategories } from 'api';
import { Category } from 'types';
import { useSearchParams } from 'react-router-dom';

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryCategory = searchParams.get('category');

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res);

      const isCategoryCorrect = res.some(
        (category) => category.slug === queryCategory
      );

      if (!isCategoryCorrect) {
        setSearchParams({});
      }
    });
  }, []);

  const setActiveCategory = (slug: string): void => {
    setSearchParams(slug ? { category: slug } : {});
  };

  return (
    <Space>
      <Button
        type={!queryCategory ? 'primary' : 'default'}
        shape='round'
        onClick={() => setActiveCategory('')}
      >
        Все
      </Button>

      {categories.map((category) => (
        <Button
          shape='round'
          type={queryCategory === category.slug ? 'primary' : 'default'}
          onClick={() => setActiveCategory(category.slug)}
          key={category._id}
        >
          {category.name}
        </Button>
      ))}
    </Space>
  );
};
