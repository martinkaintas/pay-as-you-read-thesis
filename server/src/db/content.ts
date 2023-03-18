import { Post } from "@app/models/domain";

const posts: Record<string, Post> = {
  ['123456']: {
    title: 'The Benefits of Regular Exercise',
    excerpt:
      'Regular exercise has been shown to have numerous benefits for both physical and mental health.',
    content:
      "Studies have shown that regular exercise can help reduce the risk of chronic diseases such as heart disease, diabetes, and obesity. It can also improve cardiovascular health, increase muscle strength and endurance, and help maintain a healthy weight. In addition to physical health benefits, exercise has been shown to have positive effects on mental health, such as reducing symptoms of anxiety and depression and improving mood and overall well-being. It's important to make exercise a regular part of your routine to reap these benefits.",
    date: '2021-01-01',
    author: 'John Doe',
  },

  ['234567']: {
    title: 'The Importance of Sleep for Overall Health',
    excerpt:
      'Getting enough sleep is essential for maintaining good physical and mental health.',
    content:
      "Sleep plays a crucial role in various bodily functions such as hormone regulation, metabolism, and immune system function. Lack of sleep has been linked to an increased risk of chronic diseases such as obesity, diabetes, and heart disease. It can also have negative effects on mental health, such as increased stress and anxiety levels, and decreased cognitive function. To ensure you're getting enough sleep, it's recommended to aim for 7-9 hours of sleep per night and to establish a consistent sleep schedule.",
      date: '2021-01-02',
      author: 'John Doe',
  },
  ['345678']: {
    title: 'The Benefits of Meditation',
    excerpt:
      'Meditation has been shown to have numerous benefits for both physical and mental health.',
    content:
      "Meditation is a mindfulness practice that involves focusing your attention and awareness on the present moment. Studies have shown that regular meditation can help reduce stress, anxiety, and symptoms of depression. It can also improve cognitive function, such as attention, memory, and creativity. In addition to mental health benefits, meditation has also been linked to lower blood pressure, reduced inflammation, and improved immune function. To reap the benefits of meditation, it's recommended to establish a consistent practice, even if it's just a few minutes per day.",
      date: '2021-01-03',
      author: 'John Doe',
  },
};

export default posts;
