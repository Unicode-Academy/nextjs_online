"use client";

import { useState } from "react";
import useSWR from "swr";
const faillbackDataDefault = {
  results: [],
};
const getProvince = async () => {
  const response = await fetch(`https://vapi.vnappmob.com/api/province/`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
const getDistrict = async (provinceId: string) => {
  const response = await fetch(
    `https://vapi.vnappmob.com//api/province/district/${provinceId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
const getWard = async (districtId: string) => {
  const response = await fetch(
    `https://vapi.vnappmob.com/api/province/ward/${districtId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
export default function Province() {
  const [provinceId, setProvinceId] = useState<string>("");
  const [districtId, setDistrictId] = useState<string>("");
  const {
    data: { results: province },
  } = useSWR("/province", getProvince, {
    fallbackData: faillbackDataDefault,
  });
  const {
    data: { results: district },
  } = useSWR(
    provinceId ? `/district/${provinceId}` : null,
    () => getDistrict(provinceId),
    {
      fallbackData: faillbackDataDefault,
    }
  );
  const {
    data: { results: ward },
  } = useSWR(
    districtId ? `/ward/${districtId}` : null,
    () => getWard(districtId),
    {
      fallbackData: faillbackDataDefault,
    }
  );

  return (
    <>
      <select onChange={(e) => setProvinceId(e.target.value)}>
        <option value="0">Chọn Tỉnh/Thành phố</option>
        {province.map(
          (item: { province_id: number; province_name: string }) => (
            <option key={item.province_id} value={item.province_id}>
              {item.province_name}
            </option>
          )
        )}
      </select>
      <select onChange={(e) => setDistrictId(e.target.value)}>
        <option value="0">Chọn Quận/Huyện</option>
        {district.map(
          (item: { district_id: number; district_name: string }) => (
            <option key={item.district_id} value={item.district_id}>
              {item.district_name}
            </option>
          )
        )}
      </select>
      <select>
        <option value="0">Chọn Xã/Phường</option>
        {ward.map((item: { ward_id: number; ward_name: string }) => (
          <option key={item.ward_id} value={item.ward_id}>
            {item.ward_name}
          </option>
        ))}
      </select>
    </>
  );
}
