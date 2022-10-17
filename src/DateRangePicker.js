import { useRef } from "react";
import { useDateRangePickerState } from "@react-stately/datepicker";
import { useDateRangePicker } from "@react-aria/datepicker";
import { FieldButton } from "./Button";
import { RangeCalendar } from "./RangeCalendar";
import {
  DateField,
  DateFieldInside,
  StyledField,
  TimeField
} from "./DateField";
import { Popover } from "./Popover";
import { CalendarIcon, NotAllowedIcon } from "@chakra-ui/icons";
import {
  FormLabel,
  InputGroup,
  Box,
  InputRightElement,
  Button,
  HStack,
  Text
} from "@chakra-ui/react";

export function DateRangePicker(props) {
  let state = useDateRangePickerState({
    ...props,
    shouldCloseOnSelect: false
  });
  let ref = useRef();
  let {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps
  } = useDateRangePicker(props, state, ref);

  return (
    <Box position="relative" display="inline-flex" flexDirection="column">
      <FormLabel {...labelProps}>{props.label}</FormLabel>
      <InputGroup {...groupProps} ref={ref} width="auto" display="inline-flex">
        <StyledField pr="5.5rem">
          <DateField {...startFieldProps} />
          <Box as="span" aria-hidden="true" paddingX="2">
            –
          </Box>
          <DateField {...endFieldProps} />
          {state.validationState === "invalid" && (
            <NotAllowedIcon color="red.600" position="absolute" right="12" />
          )}
        </StyledField>
        <InputRightElement>
          <FieldButton {...buttonProps} isPressed={state.isOpen}>
            <CalendarIcon />
          </FieldButton>
        </InputRightElement>
      </InputGroup>
      {state.isOpen && (
        <Popover
          {...dialogProps}
          isOpen={state.isOpen}
          onClose={() => state.setOpen(false)}
        >
          <RangeCalendar {...calendarProps} />
          <Box display="flex" gap="2">
            <DateFieldInside
              label="Start Date"
              value={state.dateRange?.start || null}
              granularity="month"
              onChange={(v) => state.setDate("start", v)}
            />
            <DateFieldInside
              label="Start Date"
              value={state.dateRange?.start || null}
              granularity="year"
              onChange={(v) => state.setDate("start", v)}
            />
            <TimeField
              label="Start time"
              value={state.timeRange?.start || null}
              onChange={(v) => state.setTime("start", v)}
            />
            <TimeField
              label="End time"
              value={state.timeRange?.end || null}
              onChange={(v) => state.setTime("end", v)}
            />
          </Box>
          <HStack>
            <Button>OK </Button>
            <Button onClick={() => state.setOpen(false)}>CONFIRM </Button>
          </HStack>
          <Box>
            <Text>this is a message </Text>
          </Box>
        </Popover>
      )}
    </Box>
  );
}
