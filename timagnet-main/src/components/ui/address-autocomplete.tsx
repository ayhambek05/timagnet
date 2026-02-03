import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface Address {
  label: string;
  name: string;
  city: string;
  postcode: string;
  context: string; // Department/Region info
}

interface AddressAutocompleteProps {
  onSelect: (address: Address) => void;
  defaultValue?: string;
}

export function AddressAutocomplete({ onSelect, defaultValue = "" }: AddressAutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)
  const [inputValue, setInputValue] = React.useState(defaultValue)
  const [addresses, setAddresses] = React.useState<Address[]>([])
  const [loading, setLoading] = React.useState(false)

  const fetchAddresses = React.useCallback(async (query: string) => {
    if (query.length < 3) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      
      if (data.features) {
        const mappedAddresses = data.features.map((feature: any) => ({
          label: feature.properties.label,
          name: feature.properties.name,
          city: feature.properties.city,
          postcode: feature.properties.postcode,
          context: feature.properties.context,
        }));
        setAddresses(mappedAddresses);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce the search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        fetchAddresses(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, fetchAddresses]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : "Search for an address..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Type address..." 
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>{loading ? "Loading..." : "No address found."}</CommandEmpty>
            <CommandGroup>
              {addresses.map((address) => (
                <CommandItem
                  key={address.label}
                  value={address.label}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    onSelect(address);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === address.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{address.label}</span>
                    <span className="text-xs text-muted-foreground">{address.context}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
