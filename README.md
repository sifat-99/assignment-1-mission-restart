# SwiftCart

SwiftCart is a responsive e-commerce website built with Vanilla JavaScript, communicating with the FakeStoreAPI to fetch products and categories.

## Live Link
[Deploy Link Here]

## Features
- Dynamic product fetching from API
- Category filtering
- Product search & details modal
- Shopping Cart functionality (Persisted in Local Storage)
- Responsive Design

---

## Assignment Questions & Answers (Bangla)

#### 1) What is the difference between `null` and `undefined`?
**উত্তর:** `null` হলো একটি অ্যাসাইন করা ভ্যালু যা নির্দেশ করে যে কোনো কিছুর অস্তিত্ব নেই বা খালি (intentional absence)। কোনো ভেরিয়েবলে ডেভেলপার নিজে `null` সেট করেন।
অন্যদিকে, `undefined` নির্দেশ করে যে একটি ভেরিয়েবল ডিক্লেয়ার করা হয়েছে কিন্তু এখনো কোনো ভ্যালু অ্যাসাইন করা হয়নি। জাভাস্ক্রিপ্ট ইঞ্জিন স্বয়ংক্রিয়ভাবে অনির্ধারিত ভেরিয়েবলকে `undefined` সেট করে।

#### 2) What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?
**উত্তর:** `map()` ফাংশন একটি অ্যারের প্রতিটি উপাদানের উপর একটি নির্দিষ্ট অপারেশন বা ফাংশন চালিয়ে একটি **নতুন অ্যারে** তৈরি করতে ব্যবহৃত হয়। এটি মূল অ্যারেকে পরিবর্তন করে না।
**পার্থক্য:**
- `map()` একটি নতুন অ্যারে রিটার্ন করে।
- `forEach()` কোনো কিছু রিটার্ন করে না (`undefined` রিটার্ন করে)। এটি শুধুমাত্র অ্যারের প্রতিটি আইটেমের জন্য লুপ চালায় বা সাইড ইফেক্টের (যেমন: কনসোলে প্রিন্ট করা) জন্য ব্যবহৃত হয়।

#### 3) What is the difference between `==` and `===`?
**উত্তর:**
- `==` (Loose Equality): এটি ভ্যালু তুলনা করার আগে ডেটা টাইপ কনভার্সন (Type Coercion) করে। যেমন: `5 == '5'` সত্য (true) হবে।
- `===` (Strict Equality): এটি ভ্যালু এবং ডেটা টাইপ—উভয়ই চেক করে। তাই `5 === '5'` মিথ্যা (false) হবে কারণ একটি নাম্বার এবং অন্যটি স্ট্রিং।

#### 4) What is the significance of `async`/`await` in fetching API data?
**উত্তর:** `async`/`await` ব্যবহার করে অ্যাসিনক্রোনাস (Asynchronous) কোডকে সিনক্রোনাস (Synchronous) কোডের মতো সহজভাবে লেখা যায়।
API থেকে ডেটা ফেচ করার সময় এটি কোডকে পরিষ্কার রাখে এবং `Software Promise` চেইনিং (`.then().catch()`) এর জটিলতা কমায়। `await` কিওয়ার্ডটি জাভাস্ক্রিপ্টকে বলে অপেক্ষা করতে যতক্ষণ না প্রমিস (Promise) রিজলভ হয়, ফলে ডেটা আসার পরেই পরবর্তী লাইন এক্সিকিউট হয়।

#### 5) Explain the concept of Scope in JavaScript (Global, Function, Block).
**উত্তর:** জাভাস্ক্রিপ্টে Scope নির্ধারণ করে যে কোডের কোন অংশে কোন ভেরিয়েবল অ্যাক্সেস করা যাবে।
- **Global Scope:** ফাংশনের বাইরে ডিক্লেয়ার করা ভেরিয়েবলগুলো গ্লোবাল স্কোপে থাকে এবং কোডের যেকোনো জায়গা থেকে অ্যাক্সেস করা যায়।
- **Function Scope:** কোনো ফাংশনের ভিতরে ডিক্লেয়ার করা ভেরিয়েবল (`var` দিয়ে) শুধুমাত্র ঐ ফাংশনের ভিতরেই অ্যাক্সেসযোগ্য।
- **Block Scope:** `{}` বা ব্লকের ভিতরে `let` বা `const` দিয়ে ডিক্লেয়ার করা ভেরিয়েবল শুধুমাত্র ঐ ব্লকের মধ্যেই সীমাবদ্ধ থাকে। ES6 এ এটি পরিচিতি পায়।
# assignment-1-mission-restart
