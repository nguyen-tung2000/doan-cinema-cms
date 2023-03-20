import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
  MenuButtonProps,
} from "@chakra-ui/react";
import React, { useState } from "react";
const MultiSelectMenu = (props: MultiSelectMenuProps): JSX.Element => {
  const { name, options, buttonProps, defaultValue } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultValue || []);
  return (
    <Menu closeOnSelect={false}>
      {({ onClose }: any) => (
        <>
          <h2 style={{ fontSize: "13px", fontWeight: 500 }}>{name}</h2>
          <MenuButton
            /* eslint-disable @typescript-eslint/ban-ts-comment */
            // @ts-ignore <MenuButton> does have a 'type' prop because it is just a button. This is to make sure clicking this doesn't submit any forms.
            type="button"
            /* eslint-enable @typescript-eslint/ban-ts-comment */
            backgroundColor={selectedOptions.length ? "purple.200" : "white"}
            color={selectedOptions.length ? "purple.500" : "gray.600"}
            borderColor={selectedOptions.length ? "purple.200" : "gray.300"}
            borderWidth={1}
            p={"12px"}
            px={"18px"}
            marginTop={"8px"}
            borderRadius="6px"
            _focus={{
              outline: "none",
            }}
            {...buttonProps}
          >
            {`${name}${selectedOptions.length > 0 ? ` (${selectedOptions.length})` : ""}`}
          </MenuButton>
          <MenuList height={"200px"} overflowY={"scroll"} zIndex={10}>
            <MenuGroup title={undefined}>
              <MenuItem
                onClick={() => {
                  setSelectedOptions([]);
                  // Have to close, otherwise the defaultValue won't be reset correctly
                  // and so the UI won't immediately show the menu item options unselected.
                  onClose();
                }}
              >
                Clear all
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuOptionGroup
              title={undefined}
              defaultValue={selectedOptions}
              type="checkbox"
              /* eslint-disable @typescript-eslint/ban-ts-comment */
              // @ts-ignore Arguments type is just wrong upstream.
              onChange={(values: string[]) => {
                // Filter out empty strings, because, well, this component seems to add
                // an empty string out of nowhere.
                setSelectedOptions(values.filter((_) => _.length));
                props.onChange?.(values);
              }}
              /* eslint-enable @typescript-eslint/ban-ts-comment */
            >
              {options.map((item) => {
                return (
                  // Use 'type'='button' to make sure it doesn't default to 'type'='submit'.
                  <MenuItemOption
                    key={`multiselect-menu-${item._id}`}
                    /* eslint-disable @typescript-eslint/ban-ts-comment */
                    // @ts-ignore <MenuItemOption> does have a 'type' prop because it is just a button. This is to make sure clicking this doesn't submit any forms.
                    type="button"
                    /* eslint-enable @typescript-eslint/ban-ts-comment */
                    value={item._id}
                  >
                    {item.name}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

MultiSelectMenu.displayName = "MultiSelectMenu";

export type MultiSelectMenuProps = {
  name: string;
  options: {
    _id: string;
    name: string;
  }[];
  defaultValue?: string[];
  onChange?: (selectedValues: string[]) => void;
  buttonProps?: MenuButtonProps;
};

export default MultiSelectMenu;
