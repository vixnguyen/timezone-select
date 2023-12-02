# Timezone Select JS

[Demo here](https://vixnguyen.github.io/timezone-select)

#### There are excellent benefits competitive to others:
- Support almost popular JS libraries/frameworks such as `React`, `Angular`, `VueJS` ...
- No DateTime dependence (neither Spacetime, Moment, Date-fns nor others).
- Official Timezone Datasource from [Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
- Easy to update Timezone Datasource with one command.
- Timezone grouped by country and offset, however, it also provides a method to get raw data of timezone (no grouping).
- Support `Deprecated` timezones that linked to other, such as `Asia/Saigon (Vietnam)`, `Asia/Chongqing (China)`, `Europe/Belfast (England)`, `Japan (Japan)`, `Singapore (Singapore)` ...

## Install
```
npm i timezone-select-js
```

## Built-in
### Methods
##### `clientTz`  
- Basically, return client timezone `America/New_York`  
- If it's a deprecated timezone, return linked timezone instead, for example if client timezone is `Japan` it will return `Asia/Tokyo`.
##### `findTzByKey`  
Return raw timezone item
```js
{
  country: '',
  name: 'Singapore',
  status: 'Deprecated',
  offset: '+08:00',
  link: 'Asia/Singapore'
}
```
##### `findTzByName`  
Return grouped timezone item
```js
{
  value: 'Asia/Singapore'
  label: '(GMT+08:00) Singapore'
  country: 'SG'
  offset: '+08:00'
  included: 'Asia/Singapore, Singapore'
}
```
##### `listTz`  
Return list of timezone that grouped by country and offset including deprecated timezone:
```js
[
  ...,
  {
    value: 'America/Los_Angeles'
    label: '(GMT-08:00) Los Angeles'
    country: 'US'
    offset: '-08:00'
    included: 'America/Los_Angeles, PST8PDT, US/Pacific'
  },
  {
    value: 'Asia/Tokyo'
    label: '(GMT+09:00) Tokyo'
    country: 'JP'
    offset: '+09:00'
    included: 'Asia/Tokyo, Japan'
  },
  ...
]
```
### Properties
##### `tzRawData`  
Return raw data source, anyone can use this data for different usage
```js
[
  ...,
  {
    country: 'US',
    name: 'America/Los_Angeles',
    status: 'Canonical',
    offset: '−08:00',
    link: ''
  },
  {
    country: '',
    name: 'Japan',
    status: 'Deprecated',
    offset: '+09:00',
    link: 'Asia/Tokyo'
  },
  ...
]
```

### Components (React only)
##### `TimezoneSelect`
Look at the example of usage below

## Usage 
### React
```jsx
import { listTz, clientTz, findTzByName } from 'timezone-select-js';
import React, { useMemo } from 'react';
import Select from 'react-select';

const TimezoneSelect = ({
  value,
  onBlur,
  onChange,
  labelStyle = 'original',
  ...props
}) => {

  const getOptions = useMemo(() => {
    return listTz();
  }, [labelStyle]);

  const handleChange = tz => {
    onChange && onChange(tz);
  };

  const constructTz = (data) => {
    return typeof data === 'string' ? findTzByName(data, getOptions) : data;
  };

  return (
    <Select
      value={constructTz(value)}
      onChange={handleChange}
      options={getOptions}
      onBlur={onBlur}
      {...props}
    />
  )
}

const App = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(clientTz());
  return (
    <div className='app'>
      <h2>Timezone Select</h2>
      <blockquote>Please make a selection</blockquote>
      <div>
        <TimezoneSelect
          value={selectedTimezone}
          onChange={setSelectedTimezone}
        />
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```
### Angular
```ts
import { listTz, clientTz } from 'timezone-select-js';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({...})
export class ExampleComponent {

  timezones = listTz();
  selectedTimezone = clientTz();

}
```
```html
<!--Using ng-option and for loop-->
<ng-select [(ngModel)]="selectedTimezone">
   <ng-option *ngFor="let tz of timezones" [value]="tz.value">{{tz.label}}</ng-option>
</ng-select>

<!--Or using items input-->
<ng-select [items]="timezones" 
           bindLabel="label" 
           bindValue="value" 
           [(ngModel)]="selectedTimezone">
</ng-select>
```

### VueJS
```js
import { listTz, clientTz } from 'timezone-select-js';

new Vue({
  el: '...',
  template: '...',
  data: {
    selected: clientTz(),
    timezones: listTz();
  }
})
```
```html
<select v-model="selected">
  <option v-for="tz in timezones" :selected="selected === tz.value" v-bind:value="tz.value">{{ tz.label }}</option>
</select>
```
## Contributing

Pull requests are always welcome!

