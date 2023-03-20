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
  Image,
  CloseButton,
  Flex,
} from "@chakra-ui/react";
import { ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "@firebase/storage";
import React from "react";
import { Controller } from "react-hook-form";
import * as z from "zod";

import { Form, InputField, FileUpload } from "@/components";
import { FOOD_FORM } from "@/constants";
import { ComBosResponse, useCreateFood, useEditFood, IFood } from "@/features/foods";
import { storage } from "@/lib/firebase";
import { useFoodStore } from "@/stores/food";

type FoodValues = Partial<IFood>;

const schema = z.object({
  name: z.string().nonempty({ message: "Tên sản phẩm là bắt buộc" }),
  price: z.string().nonempty({ message: "Giá là bắt buộc" }),
  unit: z.string().nonempty({ message: "Tên unit là bắt buộc" }),
});

function dataURLtoFile(dataurl: any, filename: string) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export const FoodFormModal = () => {
  const { isOpen, onClose, data: dataFood, type, imageSource, setImageSource } = useFoodStore();
  const isAdding = type === FOOD_FORM.ADD;
  const initialRef = React.useRef(null);
  const [fileName, setFileName] = React.useState("");

  const handleImageSave = async (blob: string) => {
    const file = dataURLtoFile(blob, fileName);
    const storageRef = ref(storage, `images/${file}`);
    await uploadBytes(storageRef, file);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return getDownloadURL(uploadTask.snapshot.ref);
  };

  const handleImageChange = (e: any) => {
    if (e.target.files) {
      Array.from(e.target.files).map((file) => readerImage(file));
      setFileName(e.target?.files[0].name || "file");
    }
  };

  const readerImage = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSource((e.target?.result as string) || "");
    };
    reader.readAsDataURL(file);
  };

  const createFoodMutation = useCreateFood();
  const editFoodMutation = useEditFood();
  const buttonText = isAdding ? "Thêm sản phẩm" : "Chỉnh sửa";

  const saveFood = async (type: string, data: IFood): Promise<ComBosResponse> => {
    if (type === FOOD_FORM.ADD) {
      const image = await handleImageSave(imageSource);
      return createFoodMutation.mutateAsync({ ...data, image });
    }
    return editFoodMutation.mutateAsync({
      data: { ...data, image: imageSource },
      foodId: data._id,
    });
  };

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <Form<FoodValues, typeof schema>
            onSubmit={async (data) => {
              await saveFood(type, data as IFood);
              onClose();
            }}
            schema={schema}
            options={{
              defaultValues: dataFood,
            }}
          >
            {({ register, formState, control }) => (
              <>
                <ModalHeader fontWeight="bold">{buttonText}</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={Stack} spacing={5} direction="column">
                  <InputField
                    label="Tên sản phẩm"
                    registration={register("name")}
                    error={formState.errors["name"]}
                  />
                  <InputField
                    label="Unit"
                    registration={register("unit")}
                    error={formState.errors["unit"]}
                  />
                  <InputField
                    label="Giá"
                    registration={register("price")}
                    error={formState.errors["price"]}
                  />
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <FileUpload
                        label="File"
                        acceptedFileTypes={"image/*"}
                        onChange={(value: any) => {
                          field.onChange(value);
                          handleImageChange(value);
                        }}
                      />
                    )}
                  />
                  {imageSource && (
                    <Flex>
                      <Image src={imageSource} alt="Image food" boxSize="100px" />
                      <CloseButton
                        size="sm"
                        ml="-25px"
                        colorScheme="teal"
                        onClick={() => setImageSource("")}
                      />
                    </Flex>
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
                    isLoading={isAdding ? createFoodMutation.isLoading : editFoodMutation.isLoading}
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
