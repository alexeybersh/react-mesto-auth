import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function DeleteConfirmPopup(cardDelete,onDeleteSubmit,isRenderLoading,isOpen,onClose) {

  function handleSubmit(e) {
    e.preventDefault();

    onDeleteSubmit(cardDelete)
  }

  return (
    <PopupWithForm
      name="delete-image"  
      title="Вы уверены?"
      submitText={isRenderLoading? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
    </PopupWithForm>
  )
}
