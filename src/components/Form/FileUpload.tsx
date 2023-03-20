import { Button, FormControl, FormLabel, InputGroup } from "@chakra-ui/react";
import React, { useRef } from "react";
import { FiFile } from "react-icons/fi";

interface FileUploadProps {
  acceptedFileTypes?: string;
  onChange: React.ChangeEventHandler;
  label?: string;
}

export const FileUpload = (props: FileUploadProps) => {
  const { label, acceptedFileTypes, onChange } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => inputRef.current?.click();

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="writeUpFile">{label}</FormLabel>
      <InputGroup>
        <Button leftIcon={<FiFile />} variant="solid" onClick={handleClick}>
          Thêm hình ảnh
        </Button>
        <input
          type="file"
          accept={acceptedFileTypes}
          ref={(e) => {
            inputRef.current = e;
          }}
          onChange={onChange}
          style={{ display: "none" }}
        />
      </InputGroup>
    </FormControl>
  );
};
