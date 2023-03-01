export interface ChangePasswordType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRespon {
  success: boolean;
  message: string;
  values: {
    errors: ChangePasswordType;
  };
}
