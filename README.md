# Timezone Select

There are exellent benifits competitive to others:
- No datatime dependence (No Spacetime, No Moment, No Date-fns).
- Official timezone data contributing by community (Wikipedia).
- Easy to update timezone data.
- Timezone grouped by country and offset, however it provide a method to get raw data (no grouping) of timezone.
- Can use this for multiple JS libraries/framworks such as `React`, `Angular`, `VueJS` ...

## Install
```
npm i timezone-select-esx
```

## Built-in
### Methods
- `clientTz`
- `listTz`
- `findTzByKey`
- `findTzByName`

### Properties
- `tzRawData`
### Components (React only)
- `TimezoneSelect`

## Usage 
### React
```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { TimezoneSelect, clientTz } from 'timezone-select-esx';

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
};

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```
### Angular
```ts
import { listTz, clientTz, findTzByName } from 'timezone-select-esx';
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
## Contributing

Pull requests are always welcome!

