CREATE TABLE `Admin` (
	`Admin_uid`	int	NOT NULL	DEFAULT auto_increment,
	`Admin_id`	varchar(255)	NOT NULL,
	`Admin_password`	varchar(255)	NOT NULL,
	`Admin_name`	varchar(255)	NOT NULL,
	`Admin_nickname`	varchar(255)	NOT NULL,
	`Admin_created_at`	datetime	NOT NULL	DEFAULT now(),
	`Admin_email`	varchar(255)	NOT NULL,
	`Admin_profile`	varchar(255)	NOT NULL
);

CREATE TABLE `Notice` (
	`Notice_id`	int	NOT NULL	DEFAULT auto_increment,
	`Admin_uid`	int	NOT NULL,
	`Users_uid`	int	NOT NULL,
	`Notice_title`	varchar(255)	NOT NULL,
	`Notice_content`	text	NOT NULL,
	`Notice_writer`	varchar(255)	NOT NULL,
	`Notice_created_at`	datetime	NOT NULL	DEFAULT now()
);

INSERT INTO Admin (Admin_id, Admin_password, Admin_name, Admin_nickname, Admin_email, Admin_profile,Admin_role)
VALUES ('test', 'test', 'test', 'test', 'test', 'test',"1");