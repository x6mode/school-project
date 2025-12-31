import { useRef, type ReactNode } from 'react';

import { useMetaHotkey } from '@/hooks/use-meta-hotkey';

import { Search } from 'lucide-react';

import { Kbd } from '@/components/shared/kbd';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/shared/input-group';

const WelcomeLayout = (): ReactNode => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useMetaHotkey('j', () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <div className='w-full grid place-items-center py-10'>
      <div className='text-center grid place-items-center'>
        <div className='w-full grid place-items-center'>
          <h1 className='gradient-animation font-black text-7xl max-lg:text-5xl!'>RikoaTech</h1>
        </div>
        <h2 className='font-semibold mt-1 text-xl tracking-[4px]! max-lg:text-base max-lg:tracking-[2px]!'>
          Будущее изображений
        </h2>
        <p className='mt-5 text-neutral-400 wrap-anywhere w-8/10 text-lg max-lg:text-base'>
          Маркетплейс эксклюзивного цифрового контента. Каждая работа существует в единственном экземпляре.
        </p>
        <InputGroup className='h-12 w-3/4 flex mt-4'>
          <InputGroupInput
            ref={inputRef}
            placeholder='Найти автора, работу, название...'
            className='text-ellipsis'
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align='inline-end'>
            <Kbd>Alt</Kbd>
            <Kbd>J</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
};

export default WelcomeLayout;
