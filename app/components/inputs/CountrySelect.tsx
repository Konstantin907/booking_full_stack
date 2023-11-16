"use client";
import useCountries from "@/app/hooks/useCountries";
//also using useCountries hook

import Select from "react-select" //ovaj se isto instalira pckg


//type koji ce da koristi:
export type CountrySelectValue = {
    flag: string,
    label: string,
    latlng: number[],
    region: string,
    value: string
}

//intefejs za country select:
interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;

}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    //koristimo hook:
    const{ getAll } = useCountries()
  return (
    <div>
        <Select
        placeholder = "Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        //customoption label
        formatOptionLabel={(option: any) => (
            <div className="
            flex flex-row items-center gap-3">
              <div>{option.flag}</div>
              <div>
                {option.label},
                <span className="text-neutral-500 ml-1">
                  {option.region}
                </span>
              </div>
            </div>
          )}
          classNames={{
            control: () => "p-3 border-2",
            input:() => "text-lg",
            option:() => "text-lg"
          }}
          theme={(theme) => ({
            ...theme,
            colors:{
                ...theme.colors,
                primary: "black",
                primary25: "#ffe4e6"
            }
          })}
        />
    </div>
  )
}

export default CountrySelect
