import React from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './styles';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  params: {
    subject: string;
    week_day: string;
    time: string;
  };
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, params }) => {
  const { id, avatar, bio, cost, name, subject, whatsapp } = teacher;

  function handleLinkToWhatsApp() {
    const formattedWeekDay = () => { 
      switch (params.week_day) {
      case ('0'):
        return 'no%20domingo';
      case ('1'):
        return 'na%20segunda-feira';
      case ('2'):
        return 'na%20terça-feira';
      case ('3'):
        return 'na%20quarta-feira';
      case ('4'):
        return 'na%20quinta-feira';
      case ('5'):
        return 'na%20sexta-feira';
      case ('6'):
        return 'no%20sábado';
    }};

    Linking.openURL(
      `whatsapp://send?text=Olá!%20Te%20encontrei%20no%20Proffy%20e%20gostaria%20de%20marcar%20uma%20aula%20de%20${params.subject}%20${formattedWeekDay()}%20às%20${params.time}.&phone=55${whatsapp}`
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subject}>{subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {cost},00</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton style={[styles.favoriteButton, styles.favorited]}>
            {/* <Image source={heartOutlineIcon} /> */}
            <Image source={unfavoriteIcon} />
          </RectButton>

          <RectButton onPress={handleLinkToWhatsApp} style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;