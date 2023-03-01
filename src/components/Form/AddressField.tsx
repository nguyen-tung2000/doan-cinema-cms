import * as React from 'react';

import { InputField, SelectField } from '@/components';
import { District, getDistrict, getWards, useCities, UserAddress, Ward } from '@/features/auth';

interface Address {
  districts: District[];
  wards: Ward[];
}

interface AddressFieldProps {
  register: any;
  formState: any;
  userAddress: UserAddress;
}

export const AddressField: React.FC<AddressFieldProps> = ({ register, formState, userAddress }) => {
  const [address, setAdress] = React.useState<Address>({ districts: [], wards: [] });
  const cityQuery = useCities();

  const onChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const code = event.target.value.split('-');
    if (code.length > 1) {
      setAdress({ districts: [], wards: [] });
      getDistrict(code[0]).then((res) => setAdress({ districts: res.districts, wards: [] }));
    }
  };

  const onChangeDistrict = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const code = event.target.value.split('-');
    if (code.length > 1) {
      setAdress({ ...address, wards: [] });
      getWards(code[0]).then((res) => setAdress({ ...address, wards: res.wards }));
    }
  };

  return (
    <React.Fragment>
      <SelectField
        label="Thành phố"
        placeholder="Thành phố"
        registration={register('address.city')}
        error={formState.errors['address']?.city}
        defaultValue={userAddress.city}
        options={[
          {
            title: '',
            items: cityQuery.data
              ? cityQuery?.data.map((city) => ({
                  label: city.name,
                  value: `${city.code}-${city.name}`,
                }))
              : [],
          },
        ]}
        onChanging={onChangeCity}
        mt="4"
      />
      <SelectField
        label="Quận / Huyện"
        placeholder="Quận / Huyện"
        registration={register('address.district')}
        error={formState.errors['address']?.district}
        defaultValue={userAddress.district}
        options={[
          {
            title: '',
            items: address?.districts.map((d) => ({
              label: d.name,
              value: `${d.code}-${d.name}`,
            })),
          },
        ]}
        onChanging={onChangeDistrict}
        mt="4"
      />
      <SelectField
        label="Phường"
        placeholder="Phường"
        registration={register('address.ward')}
        error={formState.errors['address']?.ward}
        defaultValue={userAddress.ward}
        options={[
          {
            title: '',
            items: address?.wards.map((d) => ({
              label: d.name,
              value: `${d.code}-${d.name}`,
            })),
          },
        ]}
        mt="4"
      />
      <InputField
        type="text"
        label="Đường"
        error={formState.errors['address']?.street}
        registration={register('address.street')}
        defaultValue={userAddress.street}
        mt="4"
      />
    </React.Fragment>
  );
};
