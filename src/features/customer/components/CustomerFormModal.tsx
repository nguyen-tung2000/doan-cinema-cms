import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Stack,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React from "react";
import * as z from "zod";

import { AddressField, Form, InputField } from "@/components";
import { CUSTOMER_FORM } from "@/constants";
import { CustomersResponse, UserAddress } from "@/features/auth";
import { useCreateCustomer, useUpdateCustomer } from "@/features/customer";
import { useCustomerStore } from "@/stores/customer";

export type CustomerValues = {
  email: string;
  phoneNumber: string;
  fullName: string;
  dateOfBirth: string;
  address: {
    city: string;
    district: string;
    ward: string;
    street: string;
  };
  male: boolean;
  hobby?: string;
};

const regexDate = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/i; // mm/dd/yyyy

const schemaUpdateCustomer = z.object({
  email: z.string().nonempty({ message: "Email là bắt buộc" }),
  phoneNumber: z
    .string()
    .nonempty({ message: "Số điện thoại là bắt buộc" })
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "số điện thoại không đúng định dạng"),
  fullName: z.string().nonempty({ message: "Họ tên là bắt buộc" }),
  dateOfBirth: z
    .string()
    .nonempty({ message: "Ngày sinh là bắt buộc" })
    .regex(regexDate, { message: "Ngày không đúng định dạng" }),
  hobby: z.string().nullable(),
  address: z.object({
    city: z.string().nonempty({ message: "Thành phố là bắt buộc" }),
    district: z.string().nonempty({ message: "Quận/Huyện là bắt buộc" }),
    ward: z.string().nonempty({ message: "Phường/Xã là bắt buộc" }),
    street: z.string().nonempty({ message: "Đường là bắt buộc" }),
  }),
  male: z.boolean(),
});

const schemaCreateCustomer = z.object({
  email: z.string().nonempty({ message: "Email là bắt buộc" }),
  phoneNumber: z
    .string()
    .nonempty({ message: "Số điện thoại là bắt buộc" })
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "số điện thoại không đúng định dạng"),
  fullName: z.string().nonempty({ message: "Họ tên là bắt buộc" }),
  dateOfBirth: z
    .string()
    .nonempty({ message: "Ngày sinh là bắt buộc" })
    .regex(regexDate, { message: "Ngày không đúng định dạng" }),
});

export const CustomerFormModal = () => {
  const { isOpen, onClose, type, initialValues } = useCustomerStore();
  const isAdding = type === CUSTOMER_FORM.ADD;
  const initialRef = React.useRef(null);
  const [male, setMale] = React.useState(initialValues.male.toString());

  const createCustomerMutation = useCreateCustomer();
  const updateCustomerMutation = useUpdateCustomer();
  const buttonText = isAdding ? "Thêm khách hàng" : "Cập nhật khách hàng";

  const saveData = (values: CustomerValues): Promise<CustomersResponse> => {
    if (isAdding) {
      return createCustomerMutation.mutateAsync({ ...values });
    }
    const { address } = values;
    const newCity = address.city.split("-");
    const newWard = address.ward.split("-");
    const newDistrict = address.district.split("-");

    return updateCustomerMutation.mutateAsync({
      data: {
        ...values,
        male: male === "true",
        address: {
          ...address,
          city: newCity[1],
          district: newDistrict[1],
          ward: newWard[1],
        },
      },
      customerId: initialValues._id || "",
    });
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Form<CustomerValues>
            onSubmit={async (data) => {
              await saveData(data);
              onClose();
            }}
            schema={isAdding ? schemaCreateCustomer : schemaUpdateCustomer}
            options={{
              defaultValues: initialValues,
            }}
          >
            {({ register, formState }) => (
              <>
                <ModalHeader fontWeight="bold">{buttonText}</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={Stack} spacing={5} direction="column">
                  <InputField
                    label="Họ tên"
                    registration={register("fullName")}
                    error={formState.errors["fullName"]}
                  />
                  <InputField
                    label="Email"
                    registration={register("email")}
                    error={formState.errors["email"]}
                  />
                  <InputField
                    label="Số điện thoại"
                    registration={register("phoneNumber")}
                    error={formState.errors["phoneNumber"]}
                  />
                  <InputField
                    label="Ngày sinh"
                    registration={register("dateOfBirth")}
                    error={formState.errors["dateOfBirth"]}
                  />
                  {!isAdding && (
                    <>
                      <InputField
                        label="Sở thích"
                        registration={register("hobby")}
                        error={formState.errors["hobby"]}
                      />

                      <FormControl as="fieldset">
                        <FormLabel as="legend">Sở thích</FormLabel>
                        <RadioGroup value={male} onChange={setMale}>
                          <HStack spacing="24px">
                            <Radio value="true">Nam</Radio>
                            <Radio value="false">Nữ</Radio>
                          </HStack>
                        </RadioGroup>
                        <FormHelperText>{formState.errors["male"]}</FormHelperText>
                      </FormControl>

                      <AddressField
                        register={register}
                        formState={formState}
                        userAddress={initialValues.address as UserAddress}
                      />
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose} mr={3} fontWeight="medium">
                    Trở lại
                  </Button>
                  <Button
                    backgroundColor="cyan.400"
                    color="white"
                    fontWeight="medium"
                    type="submit"
                    _hover={{
                      backgroundColor: "cyan.700",
                    }}
                    isLoading={
                      isAdding ? createCustomerMutation.isLoading : updateCustomerMutation.isLoading
                    }
                  >
                    {buttonText}
                  </Button>
                </ModalFooter>
              </>
            )}
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};
