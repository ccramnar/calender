import { useRef } from "react";
import { useCalendarState } from "@react-stately/calendar";
import { useCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { createCalendar } from "@internationalized/date";
import { CalendarButton } from "./Button";
import { CalendarGrid } from "./CalendarGrid";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack } from "@chakra-ui/react";
import {
  DateField,
  DateFieldInside,
  StyledField,
  TimeField
} from "./DateField";

import { useDatePickerState } from "@react-stately/datepicker";

export function Calendar(props) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar
  });
  let ref = useRef();
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state,
    ref
  );
  let dpstate = useDatePickerState({
    ...props,
    shouldCloseOnSelect: false
  });

  return (
    <div {...calendarProps} ref={ref}>
      <Box display="flex" alignItems="center" paddingBottom="4">
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon w={6} h={6} />
        </CalendarButton>
        <Heading as="h2" size="md" flex="1" textAlign="center">
          {title}
        </Heading>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon w={6} h={6} />
        </CalendarButton>
      </Box>
      <HStack pb="1">
        <Box display="flex" alignItems="center" pl="4rem">
          <DateFieldInside
            value={dpstate.dateValue}
            onChange={dpstate.setDateValue}
            granularity="day"
          />
        </Box>
        <Box display="flex" alignItems="center" pl="4rem">
          <TimeField
            value={dpstate.timeValue}
            onChange={dpstate.setTimeValue}
          />
        </Box>
      </HStack>
      <CalendarGrid state={state} />
      <Box display="flex" alignItems="space-around" paddingBottom="4">
        <CalendarButton onClick={state.setOpen(false)}>Close</CalendarButton>
        <CalendarButton>Apply</CalendarButton>
      </Box>
    </div>
  );
}
