let msgRef = null;

const setMessageRef = (ref) => {
  msgRef = ref;
};

const showMessage = (message, duration = 1000) => {
  if (msgRef) {
    msgRef.show(message, duration);
  }
};

export { setMessageRef, showMessage };
