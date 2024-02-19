import Button from 'react-bootstrap/Button';

function EnrolunenrolBtn( { isEnrol, onClick }) {
  
  return (
    <>
      <Button variant={isEnrol ? 'danger' : 'success'} onClick={onClick} >{isEnrol ? 'Drop' : 'Add'}</Button>{' '}
    </>
  );
}

export default EnrolunenrolBtn;