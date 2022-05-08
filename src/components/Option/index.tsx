import React from 'react';
import { 
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps,
  Text,
} from 'react-native';

import { styles } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  image: ImageProps;
}

export function Option({title,image, ...rest}: Props) {
  return (
    <TouchableOpacity 
    style={styles.container}
    {...rest} // isso é um spread operator, ele pega todo o restante das propriedades menos o title e a image que veio antes.
    >
      <Image 
        source={image}
        style={styles.image}
      />
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}