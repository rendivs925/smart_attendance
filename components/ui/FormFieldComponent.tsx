import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormFieldProps {
  name: string;
  label: string;
  type: "text" | "password" | "email" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
  control: any;
  errors: any;
  onValueChange?: (value: string) => void;
  value?: string;
}

const FormFieldComponent = ({
  name,
  label,
  type,
  placeholder,
  options,
  control,
  errors,
  onValueChange,
  value,
}: FormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {type === "select" ? (
            <Select value={value} onValueChange={onValueChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <FormControl>
              <Input type={type} placeholder={placeholder} {...field} />
            </FormControl>
          )}
          {errors[name] && <FormMessage>{errors[name]?.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default FormFieldComponent;
