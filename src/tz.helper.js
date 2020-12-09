import { TIMEZONES } from './tz.data';

const tzRawData = TIMEZONES;

const findTzByKey = (key) => {
  return TIMEZONES.find(item => item.name === key);
};

const findTzByName = (name, list) => {
  return list.find(item => item.included && item.included.includes(name));
}

const newTzItem = ({ data, displayName, offset }) => {
  return {
    value: data.name,
    label: `(GMT${data.offset}) ${displayName}`,
    included: [data.name],
    country: data.country,
    offset: data.offset,
    offsetValue: offset
  };
};

const clientTz = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const proceedDependences = (item) => {
  // proceed name offset
  const offsetParts = item.offset.split(/\d+/g);
  let offsetPrefix;
  if (offsetParts[0] === '+') {
    offsetPrefix = '+';
  } else {
    offsetPrefix = '-';
  }
  item.offset = item.offset.replace(offsetParts[0], offsetPrefix);
  const offset = +item.offset.replace(':', '');
  
  // proceed name
  const nameArr = item.name.split('/').slice(1);
  const displayName = nameArr.join('-').replace(/_/g, ' ');

  // proceed key
  const key = `${item.country}_${item.offset}`;
  return { key, offset, displayName };
};

const listTz = () => {
  const newTz = TIMEZONES.reduce((obj, item) => {
    if (item.status === 'Deprecated') {
      if (item.link) {
        // proceed tz item by using linking item
        const linkingItem = findTzByKey(item.link);
        const { key, displayName, offset } = proceedDependences(linkingItem);
        if (obj[key]) {
          obj[key].included.push(item.name);
        } else {
          obj[key] = newTzItem({ data: linkingItem, displayName, offset });
        }
      }
    } else if (item.country === '') {
      // todo
    } else {
      // proceed tz item
      const { key, displayName, offset } = proceedDependences(item);
      if (obj[key]) {
        if (obj[key].included && !obj[key].included.includes(item.name)) {
          obj[key].label += `, ${displayName}`;
          obj[key].included.push(item.name);
        }
      } else {
        obj[key] = newTzItem({ data: item, displayName, offset });
      }
    }
    return obj;
  }, {});
  return Object.values(newTz).sort((a, b) => {
    return a.offsetValue - b.offsetValue;
  });
};

export { listTz, clientTz, tzRawData, findTzByName, findTzByKey };
