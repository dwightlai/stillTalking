const books = {
  "set-boundaries-find-peace": {
    title: "Set Boundaries, Find Peace",
    author: "Nedra Glover Tawwab",
    href: "https://www.amazon.com/dp/0593192095",
  },
  "difficult-conversations": {
    title: "Difficult Conversations",
    author: "Douglas Stone, Bruce Patton, and Sheila Heen",
    href: "https://www.amazon.com/dp/0143118447",
  },
} as const;

export function BookLink({ id }: { id: keyof typeof books }) {
  const book = books[id];

  return (
    <a href={book.href} target="_blank" rel="noopener noreferrer">
      <cite>{book.title}</cite> by {book.author}
    </a>
  );
}
