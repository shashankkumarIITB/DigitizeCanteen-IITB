CREATE TABLE IF NOT EXISTS hostel (
  hostel_id SERIAL,
  hostel_number INTEGER NOT NULL UNIQUE CHECK (hostel_number > 0),
  hostel_name VARCHAR (100) UNIQUE NOT NULL,
  PRIMARY KEY (hostel_id)
);

CREATE TABLE IF NOT EXISTS canteen (
  canteen_id SERIAL,
  hostel_id INTEGER NOT NULL,
  time_open TIMESTAMP NOT NULL,
  time_close TIMESTAMP NOT NULL,
  accepting_orders BOOLEAN DEFAULT TRUE,
  ratings NUMERIC (3, 1) NOT NULL DEFAULT 0.0,
  PRIMARY KEY (canteen_id),
  CONSTRAINT canteen_hostel_fkey
    FOREIGN KEY (hostel_id)
      REFERENCES hostel (hostel_id)
);

CREATE TABLE IF NOT EXISTS owner (
  owner_id SERIAL,
  firstname VARCHAR (50) NOT NULL,
  middlename VARCHAR (50),
  lastname VARCHAR (50) NOT NULL,
  phone INTEGER NOT NULL CHECK (phone >= 0),
  email VARCHAR (200) UNIQUE NOT NULL,
  PRIMARY KEY (owner_id)
);

CREATE TABLE IF NOT EXISTS contact (
  contact_id SERIAL,
  owner_id INTEGER NOT NULL,
  canteen_id INTEGER NOT NULL,
  PRIMARY KEY (contact_id),
  CONSTRAINT contact_owner_fkey
    FOREIGN KEY (owner_id)
      REFERENCES owner (owner_id),
  CONSTRAINT contact_canteen_fkey
    FOREIGN KEY (canteen_id)
      REFERENCES canteen (canteen_id) 
);

CREATE TABLE IF NOT EXISTS menu (
  menu_id SERIAL,
  name VARCHAR (100) NOT NULL UNIQUE,
  picture VARCHAR (200),
  PRIMARY KEY (menu_id)
);

CREATE TABLE IF NOT EXISTS canteen_menu (
  canteen_menu_id SERIAL,
  menu_id INTEGER NOT NULL,
  canteen_id INTEGER NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  price NUMERIC (5, 2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (canteen_menu_id),
  CONSTRAINT canteen_menu_canteen_fkey
    FOREIGN KEY (canteen_id)
      REFERENCES canteen (canteen_id),
  CONSTRAINT canteen_menu_menu_fkey
    FOREIGN KEY (menu_id)
      REFERENCES menu (menu_id)
);

CREATE TABLE IF NOT EXISTS category (
  category_id SERIAL,
  menu_id INTEGER NOT NULL,
  PRIMARY KEY (category_id),
  CONSTRAINT category_menu_fkey
    FOREIGN KEY (menu_id)
      REFERENCES menu (menu_id) 
);

CREATE TABLE IF NOT EXISTS student (
  student_id SERIAL,
  roll_number VARCHAR (50) NOT NULL,
  firstname VARCHAR (50) NOT NULL,
  middlename VARCHAR (50),
  lastname VARCHAR (50),
  phone INTEGER NOT NULL CHECK (phone >= 0),
  email VARCHAR (200) UNIQUE NOT NULL,
  bill NUMERIC (7, 2) NOT NULL DEFAULT 0.00,
  hostel_id INTEGER,
  PRIMARY KEY (student_id),
  CONSTRAINT student_hostel_fkey
    FOREIGN KEY (hostel_id)
      REFERENCES hostel (hostel_id)
);

CREATE TABLE IF NOT EXISTS orders (
  order_id SERIAL,
  menu_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price NUMERIC (5, 2) NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  status VARCHAR (20) NOT NULL,
  order_time TIMESTAMP NOT NULL,
  PRIMARY KEY (order_id),
  CONSTRAINT orders_menu_fkey
    FOREIGN KEY (menu_id)
      REFERENCES menu (menu_id),
  CONSTRAINT orders_student_fkey
    FOREIGN KEY (student_id)
      REFERENCES student (student_id)
);

CREATE TABLE IF NOT EXISTS orders_history (
  order_history_id SERIAL,
  menu_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price NUMERIC (5, 2) NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  order_time TIMESTAMP NOT NULL,
  PRIMARY KEY (order_history_id),
  CONSTRAINT orders_history_menu_fkey
    FOREIGN KEY (menu_id)
      REFERENCES menu (menu_id),
  CONSTRAINT orders_history_student_fkey
    FOREIGN KEY (student_id)
      REFERENCES student (student_id)
);
