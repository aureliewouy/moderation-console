interface ModalSuccessProps {
  modalSuccess: string;
}

function ModalSuccess(props: ModalSuccessProps): JSX.Element {
  const { modalSuccess } = props;
  return (
    <div className="success">
      <p>{modalSuccess} !</p>
    </div>
  );
}

export default ModalSuccess;
