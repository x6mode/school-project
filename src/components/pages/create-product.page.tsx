import type { ReactNode } from 'react';

import Header from '@/components/widgets/header';

const CreateProductPage = (): ReactNode => {
  return (
    <div className='page'>
      <Header />
      <div className="desc">
        <h1>Создание новой карточ</h1>
      </div>
    </div>
  );
};

export default CreateProductPage;
