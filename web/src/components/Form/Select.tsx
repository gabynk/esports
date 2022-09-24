import * as SelectRadix from '@radix-ui/react-select';
import { CaretDown, CaretUp } from "phosphor-react";

interface Options {
  id: string;
  title: string;
}

interface SelectProps {
  options: Options[];
  label: string;
  placeholder: string;
  name: string;
  selectedValue: string;
  onSelectedValue: (value: string) => void;
}

export function Select({ options, label, placeholder, name, selectedValue, onSelectedValue }: SelectProps) {
  return (
    <SelectRadix.Root onValueChange={onSelectedValue}>
      <label htmlFor={name}>{label}</label>

      <SelectRadix.Trigger
        className={`bg-zinc-900 flex justify-between items-center py-3 px-4 rounded text-sm ${selectedValue.length === 0 ? 'text-zinc-500' : 'text-white'}`}
      >
        <SelectRadix.Value placeholder={placeholder} />
        <SelectRadix.Icon>
          <CaretDown size={17} weight="bold" className="text-zinc-400" />
        </SelectRadix.Icon>
      </SelectRadix.Trigger>

      <SelectRadix.Portal>
        <SelectRadix.Content className="bg-zinc-900 py-3 px-4 text-sm text-white">
          <SelectRadix.ScrollUpButton className="p-2 flex items-center justify-center">
            <CaretUp size={17} className="text-white" />
          </SelectRadix.ScrollUpButton>

          <SelectRadix.Viewport>
            {options.map(({ id, title }, index) => {
              return (
                <div key={id}>
                  <SelectRadix.Item
                    key={id}
                    value={id}
                    className="flex items-center py-2 px-4 text-zinc-300 cursor-pointer"
                  >
                    <SelectRadix.ItemText>{title}</SelectRadix.ItemText>
                  </SelectRadix.Item>
                  {index !== options.length - 1 ? <SelectRadix.Separator className="h-px bg-zinc-700" /> : null}
                </div>
              )
            })}
          </SelectRadix.Viewport>
          <SelectRadix.ScrollDownButton className="p-2 flex items-center justify-center">
            <CaretDown size={20} className="text-white" />
          </SelectRadix.ScrollDownButton>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  );
};