import { Post } from '@app/models/domain';

const posts: Record<string, Post> = {
  ['123456']: {
    title: 'The Benefits of Regular Exercise',
    excerpt:
      'Regular exercise has been shown to have numerous benefits for both physical and mental health.',
    content: `[1/2] Regular exercise has a multitude of benefits for both physical and mental health. One of the most significant benefits is the improvement in cardiovascular health. Exercise helps to strengthen the heart and improve circulation, which can reduce the risk of heart disease and stroke. Additionally, regular exercise can help to lower blood pressure, reduce cholesterol levels, and improve insulin sensitivity, which can all contribute to a healthier cardiovascular system.

    [2/2] Exercise can also have positive effects on mental health. It has been shown to reduce symptoms of anxiety and depression, as well as improve mood and overall well-being. This is due to the release of endorphins, which are natural feel-good chemicals in the brain. Regular exercise can also improve cognitive function, including memory and focus, and may even reduce the risk of age-related cognitive decline. Overall, the benefits of regular exercise are numerous, and it is important to incorporate physical activity into your daily routine for optimal health and well-being.`,
    date: '2021-01-01',
    author: 'John Doe',
  },

  ['234567']: {
    title: 'The Importance of Sleep for Overall Health',
    excerpt:
      'Getting enough sleep is essential for maintaining good physical and mental health.',
    content: `[1/4] Getting enough sleep is crucial for maintaining good health and well-being. Sleep is essential for our bodies to repair and regenerate, and it plays a critical role in many bodily functions.
      
      [2/4] Sleep is important for physical health, as it helps to support the immune system and repair tissues and cells in the body. During sleep, the body produces cytokines, which are proteins that help to fight infections and inflammation. Additionally, sleep is important for maintaining a healthy weight, as lack of sleep can disrupt the hormones that regulate appetite and metabolism.
      
      [3/4] Sleep also plays a critical role in mental health. It is essential for emotional well-being, as lack of sleep can contribute to anxiety, depression, and irritability. Sleep is also important for cognitive function, as it helps to consolidate memories and improve learning and problem-solving abilities.
      
      [4/4] Getting enough sleep is important for optimal performance, both physically and mentally. Lack of sleep can impair physical performance, as it can reduce endurance, strength, and coordination. It can also affect mental performance, including reaction time, attention, and decision-making abilities. On the other hand, getting enough sleep can improve performance in all areas, making it a key factor in achieving success and reaching our goals.`,
    date: '2021-01-02',
    author: 'John Doe',
  },
  ['345678']: {
    title: 'The Benefits of Meditation',
    excerpt:
      'Meditation has been shown to have numerous benefits for both physical and mental health.',
    content:
      "[1/1] Meditation is a mindfulness practice that involves focusing your attention and awareness on the present moment. Studies have shown that regular meditation can help reduce stress, anxiety, and symptoms of depression. It can also improve cognitive function, such as attention, memory, and creativity. In addition to mental health benefits, meditation has also been linked to lower blood pressure, reduced inflammation, and improved immune function. To reap the benefits of meditation, it's recommended to establish a consistent practice, even if it's just a few minutes per day.",
    date: '2021-01-03',
    author: 'John Doe',
  },
};

export default posts;
