import { useState } from 'react';
import Header from '@/components/sections/Header';
import OptionsMenu from '@/components/ultis/OptionsMenu';
import MangaEdit from '@/components/sections/lists/MangasEdit';
import ContainerAdd from '@/components/sections/ContainerAdd';
import Container from '@/components/ultis/Container';

export default function Profile() {
  const [optionPicker, setOptionPicker] = useState<number>(0);

  return (<div>
    <Header/>
    <main>
      <OptionsMenu 
        selection={{
          condi: optionPicker,
          func: (indice) => setOptionPicker(indice)
        }} 
        options={[
          {name:'adicionar', onClick(){}},
          {name:'remover', onClick(){}},
        ]}
      />
      <Container>
        {(optionPicker==0) ? <ContainerAdd/> : <MangaEdit/>}
      </Container>
    </main>
  </div>);
}
