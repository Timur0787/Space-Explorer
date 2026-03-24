'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     
   
     await queryInterface.bulkInsert('Planets', [
         {
        name: 'Меркурий',
        diam: '4,879 км',
        distantion: '57.9 млн км',
        saliter: 0,
        description: 'Самая маленькая и ближайшая к Солнцу планета Солнечной системы.',
        img:"https://starwalk.space/gallery/images/facts-about-mercury/1920x1080.jpg"
       
      },
      {
        name: 'Венера',
        diam: '12,104 км',
        distantion: '108.2 млн км',
        saliter: 0,
        description: 'Вторая планета от Солнца, самая горячая планета с плотной атмосферой из углекислого газа.',
      img:"https://s0.rbk.ru/v6_top_pics/media/img/2/15/347086156890152.png"
      },
      {
        name: 'Земля',
        diam: '12,742 км',
        distantion: '149.6 млн км',
        saliter: 1,
        description: 'Третья планета от Солнца, единственная известная планета с жизнью.',
        img:"https://oosvr09.ru/uploads/posts/2023-04/1682508354_0z-rrjeljli.jpg"
      
      },
      {
        name: 'Марс',
        diam: '6,779 км',
        distantion: '227.9 млн км',
        saliter: 2,
        description: 'Четвертая планета от Солнца, известная как "Красная планета" из-за оксида железа на поверхности.',
      img:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Mars_Valles_Marineris_EDIT.jpg/330px-Mars_Valles_Marineris_EDIT.jpg"
      },
      
     
      {
        name: 'Юпитер',
        diam: '139,820 км',
        distantion: '778.5 млн км',
        saliter: 79,
        description: 'Крупнейшая планета Солнечной системы, газовый гигант с Большим красным пятном.',
        img:"https://img.rl0.ru/afisha/e1200x1200i/daily.afisha.ru/uploads/images/7/15/7159185c41584f67bb06aa5e6b25c258.jpg"
      
      },
      {
        name: 'Сатурн',
        diam: '116,460 км',
        distantion: '1.4 млрд км',
        saliter: 82,
        description: 'Вторая по величине планета, известная своими впечатляющими кольцами.',
        img:"https://starwalk.space/gallery/images/saturn-planet-guide/1140x641.jpg"
       
      },
      {
        name: 'Уран',
        diam: '50,724 км',
        distantion: '2.9 млрд км',
        saliter: 27,
        description: 'Ледяной гигант, вращающийся "на боку" относительно своей орбиты.',
        img:"https://starwalk.space/gallery/images/uranus-facts/1920x1080.jpg"
     
      },
      {
        name: 'Нептун',
        diam: '49,244 км',
        distantion: '4.5 млрд км',
        saliter: 14,
        description: 'Самый удаленный от Солнца газовый гигант, известный сильными ветрами.',
        img:"https://upload.wikimedia.org/wikipedia/commons/d/de/Neptune_enhanced_colour.jpg"
      
      },
      
   
      {
        name: 'Плутон',
        diam: '2,377 км',
        distantion: '5.9 млрд км',
        saliter: 5,
        description: 'Карликовая планета в поясе Койпера, ранее считавшаяся девятой планетой.',
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxPGu-IfDogq0txGlIOYi0KLRDCzKwFATUYQ&s"
      
      },
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
