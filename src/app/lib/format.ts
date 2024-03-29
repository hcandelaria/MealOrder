export const formatPhoneNumber = (input: string) => {
  //  if the input is null, return a null value
  if (!input) return input;
  // remove all characters from the input except number input.
  const numberInput = input.replace(/[^\d]/g, '');
  //  take the length of the value of the input
  const numberInputLength = numberInput.length;
  // if the number length is 1, 2, or 3, then return it as it is.
  if (numberInputLength < 4) {
    return numberInput;
  } else if (numberInputLength < 7) {
    // if the number input length is 4, 5, or 6, format it accordingly.
    return `(${numberInput.slice(0, 3)}) ${numberInput.slice(3)}`;
  } else {
    //  if the number input length is 7, 8, 9, 10, or more, format it like the below.
    return `(${numberInput.slice(0, 3)}) ${numberInput.slice(
      3,
      6
    )}-${numberInput.slice(6, 10)}`;
  }
};

export const formatRawPhoneNumber = (input: string) => {
  if (!input) return input;
  const rawPhone = input.replace(/[^0-9]/g, '').substring(0, 10);
  return rawPhone;
};
