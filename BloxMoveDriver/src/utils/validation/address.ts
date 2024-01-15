export const validateSimpleAddress = (data: any) =>
  !!data?.address || 'This field is required.';

export const validateFullAddress = (data: any) =>
  data?.address && data?.city && data?.postalCode && data?.subDivisionPubId
    ? true
    : 'Please enter a valid address.';

export const validateZIPCode = (value: string) =>
  (!Number.isNaN(value) && value.length === 5) || 'Please enter valid zipcode.';
