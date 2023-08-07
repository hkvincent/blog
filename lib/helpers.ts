import { DateTime } from "luxon";
import readingTime from "reading-time";
import directus from "./directus";
import { cache } from "react";

export const getReadingTime = (text: string, locale: string) => {
  const minute = readingTime(text ?? 0).minutes;
  // Floor to 1 decimal place
  const minutesRounded = Math.floor(minute);
  if (locale === "de") {
    if (minutesRounded === 1) {
      return `${minutesRounded} Minute`;
    } else {
      return `${minutesRounded} Minuten`;
    }
  } else {
    if (minutesRounded === 1) {
      return `${minutesRounded} minute`;
    } else {
      return `${minutesRounded} minutes`;
    }
  }
};

export const getRelativeDate = (date: string, locale: string) => {
  return DateTime.fromISO(date).setLocale(locale).toRelative();
};



// Get Category Data
export const getCategoryData: (categorySlug: string, locale: string) => Promise<any> = cache(
  async (categorySlug: string, locale: string) => {
    try {
      const category = await directus.items("category").readByQuery({
        filter: {
          slug: {
            _eq: categorySlug,
          },
        },
        fields: [
          "*",
          "translations.*",
          "posts.*",
          "posts.author.id",
          "posts.author.first_name",
          "posts.author.last_name",
          "posts.category.id",
          "posts.category.title",
          "posts.translations.*",
        ],
      });

      if (locale === "en") {
        return category?.data?.[0];
      } else {
        const fetchedCategory = category?.data?.[0];
        const localisedCategory = {
          ...fetchedCategory,
          title: fetchedCategory.translations.find((translate: any) => translate.languages_code === locale)?.title,
          description: fetchedCategory.translations.find((translate: any) => translate.languages_code === locale)?.description,
          posts: fetchedCategory.posts.map((post: any) => {
            return {
              ...post,
              title: post.translations.find((translate: any) => translate.languages_code === locale)?.title,
              description: post.translations.find((translate: any) => translate.languages_code === locale)?.description,
              body: post.translations.find((translate: any) => translate.languages_code === locale)?.body,
              category: {
                ...post.category,
                title: fetchedCategory.translations.find((translate: any) => translate.languages_code === locale)?.title,
              },
            };
          }),
        };
        return localisedCategory;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching category");
    }
  }
);


// Get Post Data
export const getPostData = cache(async (postSlug: string, locale: string) => {
  try {
    const post = await directus.items("post").readByQuery({
      filter: {
        slug: {
          _eq: postSlug,
        },
      },
      fields: [
        "*",
        "category.id",
        "category.title",
        "auhtor.id",
        "author.first_name",
        "author.last_name",
        "translations.*",
        "category.translations.*",
      ],
    });

    const postData = post?.data?.[0];

    if (locale === "en") {
      return postData;
    } else {
      const localisedPostData = {
        ...postData,
        title: postData?.translations?.[0]?.title,
        description: postData?.translations?.[0]?.description,
        body: postData?.translations?.[0]?.body,
        category: {
          ...postData?.category,
          title: postData?.category?.translations?.[0]?.title,
        },
      };

      return localisedPostData;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching post");
  }
});