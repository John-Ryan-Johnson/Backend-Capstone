USE [master]
GO
/****** Object:  Database [SupersChoice]    Script Date: 1/12/2021 12:29:22 PM ******/
CREATE DATABASE [SupersChoice]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SupersChoice', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SupersChoice.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SupersChoice_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SupersChoice_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SupersChoice] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SupersChoice].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SupersChoice] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SupersChoice] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SupersChoice] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SupersChoice] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SupersChoice] SET ARITHABORT OFF 
GO
ALTER DATABASE [SupersChoice] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SupersChoice] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SupersChoice] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SupersChoice] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SupersChoice] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SupersChoice] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SupersChoice] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SupersChoice] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SupersChoice] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SupersChoice] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SupersChoice] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SupersChoice] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SupersChoice] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SupersChoice] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SupersChoice] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SupersChoice] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SupersChoice] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SupersChoice] SET RECOVERY FULL 
GO
ALTER DATABASE [SupersChoice] SET  MULTI_USER 
GO
ALTER DATABASE [SupersChoice] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SupersChoice] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SupersChoice] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SupersChoice] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SupersChoice] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'SupersChoice', N'ON'
GO
ALTER DATABASE [SupersChoice] SET QUERY_STORE = OFF
GO
USE [SupersChoice]
GO
/****** Object:  Table [dbo].[DowntimeCodes]    Script Date: 1/12/2021 12:29:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DowntimeCodes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[codeText] [varchar](100) NOT NULL,
 CONSTRAINT [PK_DowntimeCodes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 1/12/2021 12:29:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [nvarchar](100) NOT NULL,
	[lastName] [nvarchar](100) NOT NULL,
	[isSupervisor] [bit] NULL,
	[isDeleted] [bit] NULL,
	[email] [nvarchar](255) NULL,
	[password] [nvarchar](100) NULL,
	[firebaseUid] [nvarchar](100) NULL,
 CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MachineAssignments]    Script Date: 1/12/2021 12:29:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MachineAssignments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[machineId] [int] NOT NULL,
	[employeeId] [int] NOT NULL,
	[isDeleted] [bit] NULL,
	[isRunning] [bit] NULL,
	[Date] [date] NOT NULL,
	[downtimeCodeId] [int] NULL,
	[machineDetailId] [int] NULL,
	[isCompleted] [bit] NULL,
 CONSTRAINT [PK_Machines] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MachineDetails]    Script Date: 1/12/2021 12:29:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MachineDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[notes] [varchar](2000) NULL,
	[runtime] [decimal](4, 2) NULL,
	[downtime] [decimal](4, 2) NULL,
 CONSTRAINT [PK_MachineInfo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Machines]    Script Date: 1/12/2021 12:29:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Machines](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK__Machines__3214EC07C801245A] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[DowntimeCodes] ON 
GO
INSERT [dbo].[DowntimeCodes] ([Id], [codeText]) VALUES (1, N'no problems')
GO
INSERT [dbo].[DowntimeCodes] ([Id], [codeText]) VALUES (2, N'cleaning')
GO
INSERT [dbo].[DowntimeCodes] ([Id], [codeText]) VALUES (3, N'maintenance')
GO
INSERT [dbo].[DowntimeCodes] ([Id], [codeText]) VALUES (4, N'quality')
GO
INSERT [dbo].[DowntimeCodes] ([Id], [codeText]) VALUES (5, N'no material')
GO
INSERT [dbo].[DowntimeCodes] ([Id], [codeText]) VALUES (6, N'meeting')
GO
INSERT [dbo].[DowntimeCodes] ([Id], [codeText]) VALUES (7, N'tow motor')
GO
INSERT [dbo].[DowntimeCodes] ([Id], [codeText]) VALUES (8, N'set up')
GO
SET IDENTITY_INSERT [dbo].[DowntimeCodes] OFF
GO
SET IDENTITY_INSERT [dbo].[Employees] ON 
GO
INSERT [dbo].[Employees] ([Id], [firstName], [lastName], [isSupervisor], [isDeleted], [email], [password], [firebaseUid]) VALUES (1, N'Reid', N'Stark', 0, 0, N'r.stark@mymail.com', N'123456', N'gambiVuZpYZa08hbI2RWuSJaM883')
GO
INSERT [dbo].[Employees] ([Id], [firstName], [lastName], [isSupervisor], [isDeleted], [email], [password], [firebaseUid]) VALUES (2, N'Marco', N'Whitley', 1, 0, N'marcopolo@poolgames.com', N'password', N'hgjTxv8B7IM74fLE8dAgzjIekJv1')
GO
INSERT [dbo].[Employees] ([Id], [firstName], [lastName], [isSupervisor], [isDeleted], [email], [password], [firebaseUid]) VALUES (3, N'Henley', N'Burke', 0, 0, N'h.burke@mymail.com', N'password1', N'exGikibVVJhTbeQjgCpvmaV3fFN2')
GO
INSERT [dbo].[Employees] ([Id], [firstName], [lastName], [isSupervisor], [isDeleted], [email], [password], [firebaseUid]) VALUES (4, N'Christian', N'Rogers', 0, 0, N'c.rogers@mymail.com', N'password2', N'mtdJw6AoGDPSn3alNe6atLcSXoh1')
GO
INSERT [dbo].[Employees] ([Id], [firstName], [lastName], [isSupervisor], [isDeleted], [email], [password], [firebaseUid]) VALUES (5, N'Timur', N'Fitzpatrick', 0, 0, N't.fitzpatrick@mymail.com', N'password3', N'jLAjg5JHpLMA4F7P8wjpIpqBaua2')
GO
INSERT [dbo].[Employees] ([Id], [firstName], [lastName], [isSupervisor], [isDeleted], [email], [password], [firebaseUid]) VALUES (6, N'Fletcher', N'Cash', 0, 0, N'f.cash@mymail.com', N'password4', N'jECnNYYmKhOsw9vqObKDgRKFZDg2')
GO
INSERT [dbo].[Employees] ([Id], [firstName], [lastName], [isSupervisor], [isDeleted], [email], [password], [firebaseUid]) VALUES (9, N'The', N'Rock', 0, 0, N't.rock@mymail.com', N'mypassword', N'Qu6HQI4r0hdyf9zYCLf33wi9P7A2')
GO
INSERT [dbo].[Employees] ([Id], [firstName], [lastName], [isSupervisor], [isDeleted], [email], [password], [firebaseUid]) VALUES (10, N'Steve', N'Smith', 0, 0, N'steve@mymail.com', N'stevepassword', N'INljX74AY2g3PuzPA4adWUdPZ1G2')
GO
INSERT [dbo].[Employees] ([Id], [firstName], [lastName], [isSupervisor], [isDeleted], [email], [password], [firebaseUid]) VALUES (11, N'John', N'Smith', 0, 0, N'john@johnmail.com', N'password', N'v9qp79VhOeWB6rccipYQRT7zUGo2')
GO
INSERT [dbo].[Employees] ([Id], [firstName], [lastName], [isSupervisor], [isDeleted], [email], [password], [firebaseUid]) VALUES (12, N'Greg', N'Masters', 0, 0, N'greg@gregmail.com', N'password', N'i7im6dT8wzQ7fDVL5X4BctY57RN2')
GO
SET IDENTITY_INSERT [dbo].[Employees] OFF
GO
SET IDENTITY_INSERT [dbo].[MachineAssignments] ON 
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (3, 1, 1, 0, 0, CAST(N'2020-11-30' AS Date), 1, 3, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (4, 1, 1, 0, 0, CAST(N'2020-12-05' AS Date), 1, 4, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (5, 2, 4, 0, 0, CAST(N'2020-12-28' AS Date), 2, 3, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (8, 3, 4, 0, 0, CAST(N'2020-12-11' AS Date), 2, 16, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (9, 4, 2, 0, 0, CAST(N'2020-12-12' AS Date), 8, 18, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (10, 5, 9, 0, 0, CAST(N'2020-12-20' AS Date), 5, 4, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (12, 6, 3, 0, 0, CAST(N'2020-12-23' AS Date), 2, 3, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (13, 1, 1, 0, 0, CAST(N'2020-12-31' AS Date), 1, 5, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (14, 2, 4, 0, 0, CAST(N'2020-12-31' AS Date), 5, 6, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (15, 3, 9, 0, 0, CAST(N'2020-12-31' AS Date), 2, 7, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (16, 5, 5, 0, 0, CAST(N'2020-12-31' AS Date), 2, 8, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (17, 6, 3, 0, 0, CAST(N'2021-01-01' AS Date), 8, 9, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (18, 9, 4, 0, 0, CAST(N'2021-01-02' AS Date), 3, 10, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (19, 8, 9, 0, 0, CAST(N'2021-01-02' AS Date), 4, 11, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (20, 4, 6, 0, 0, CAST(N'2021-01-03' AS Date), 3, 12, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (25, 8, 6, 0, 0, CAST(N'2021-01-04' AS Date), 2, 15, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (26, 9, 9, 0, 0, CAST(N'2021-01-04' AS Date), 4, 19, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (27, 4, 5, 0, 0, CAST(N'2021-01-04' AS Date), 1, 22, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (28, 7, 5, 0, 0, CAST(N'2021-01-05' AS Date), 8, 23, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (29, 8, 5, 0, 0, CAST(N'2021-01-05' AS Date), 5, 24, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (30, 3, 5, 0, 0, CAST(N'2021-01-05' AS Date), NULL, NULL, NULL)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (31, 8, 10, 0, 0, CAST(N'2021-01-09' AS Date), 2, 25, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (32, 5, 11, 0, 0, CAST(N'2021-01-09' AS Date), 4, 26, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (33, 8, 11, 0, 0, CAST(N'2021-01-09' AS Date), 2, 27, 1)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (34, 3, 3, 0, 0, CAST(N'2021-01-11' AS Date), NULL, NULL, NULL)
GO
INSERT [dbo].[MachineAssignments] ([Id], [machineId], [employeeId], [isDeleted], [isRunning], [Date], [downtimeCodeId], [machineDetailId], [isCompleted]) VALUES (35, 6, 12, 0, 0, CAST(N'2021-01-12' AS Date), 2, 28, 1)
GO
SET IDENTITY_INSERT [dbo].[MachineAssignments] OFF
GO
SET IDENTITY_INSERT [dbo].[MachineDetails] ON 
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (3, N'scrap backed up, hose busted', CAST(7.00 AS Decimal(4, 2)), CAST(0.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (4, N'scrap backed up, hose busted', CAST(7.75 AS Decimal(4, 2)), CAST(0.25 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (5, N'no problems', CAST(8.00 AS Decimal(4, 2)), CAST(0.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (6, N'machine crashed', CAST(5.00 AS Decimal(4, 2)), CAST(3.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (7, N'crane down', CAST(7.00 AS Decimal(4, 2)), CAST(1.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (8, N'company party', CAST(4.00 AS Decimal(4, 2)), CAST(4.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (9, N'waiting on tow motor', CAST(7.75 AS Decimal(4, 2)), CAST(0.25 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (10, N'sensors shutting off machine every 100 strokes', CAST(5.25 AS Decimal(4, 2)), CAST(2.75 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (11, N'no problems', CAST(8.00 AS Decimal(4, 2)), CAST(0.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (12, N'material too wide', CAST(7.00 AS Decimal(4, 2)), CAST(1.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (13, N'running samples for quality', CAST(6.00 AS Decimal(4, 2)), CAST(2.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (14, N'no probs', CAST(3.00 AS Decimal(4, 2)), CAST(5.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (15, N'no probs', CAST(3.00 AS Decimal(4, 2)), CAST(5.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (16, N'dfgrgwrftdg', CAST(7.25 AS Decimal(4, 2)), CAST(0.75 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (17, N'too much', CAST(5.50 AS Decimal(4, 2)), CAST(2.50 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (18, N'too much', CAST(5.50 AS Decimal(4, 2)), CAST(2.50 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (19, N'ghkjwrgjg', CAST(7.25 AS Decimal(4, 2)), CAST(0.75 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (20, N'jkjkljljlljkjkl', CAST(4.00 AS Decimal(4, 2)), CAST(4.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (21, N'tutyutyutyui', CAST(8.00 AS Decimal(4, 2)), CAST(0.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (22, N'sdasfsdfsdfs', CAST(8.00 AS Decimal(4, 2)), CAST(0.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (23, N'gjlhjkghjklgjhklkkhfj', CAST(7.50 AS Decimal(4, 2)), CAST(0.50 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (24, N'cxzxcvxzcvzxcvzxcv', CAST(5.75 AS Decimal(4, 2)), CAST(2.25 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (25, N'cleaned up oil spill from drum', CAST(7.00 AS Decimal(4, 2)), CAST(1.00 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (26, N'quality- material too wide', CAST(6.50 AS Decimal(4, 2)), CAST(1.50 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (27, N'cleaning- cleaning machine before shift change over', CAST(7.50 AS Decimal(4, 2)), CAST(0.50 AS Decimal(4, 2)))
GO
INSERT [dbo].[MachineDetails] ([Id], [notes], [runtime], [downtime]) VALUES (28, N'cleaning - cleaned before shift change over', CAST(6.50 AS Decimal(4, 2)), CAST(1.50 AS Decimal(4, 2)))
GO
SET IDENTITY_INSERT [dbo].[MachineDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[Machines] ON 
GO
INSERT [dbo].[Machines] ([Id], [Name]) VALUES (1, N'400-Ton Minster')
GO
INSERT [dbo].[Machines] ([Id], [Name]) VALUES (2, N'400-Ton Bliss')
GO
INSERT [dbo].[Machines] ([Id], [Name]) VALUES (3, N'300-Ton Minster')
GO
INSERT [dbo].[Machines] ([Id], [Name]) VALUES (4, N'250-Ton Niagara')
GO
INSERT [dbo].[Machines] ([Id], [Name]) VALUES (5, N'200-Ton Minster')
GO
INSERT [dbo].[Machines] ([Id], [Name]) VALUES (6, N'150-Ton Minster')
GO
INSERT [dbo].[Machines] ([Id], [Name]) VALUES (7, N'200-Ton Bliss')
GO
INSERT [dbo].[Machines] ([Id], [Name]) VALUES (8, N'150-Ton Clearing')
GO
INSERT [dbo].[Machines] ([Id], [Name]) VALUES (9, N'400-Ton Komatsu')
GO
SET IDENTITY_INSERT [dbo].[Machines] OFF
GO
ALTER TABLE [dbo].[MachineAssignments]  WITH CHECK ADD  CONSTRAINT [FK__Machines__downti__30F848ED] FOREIGN KEY([downtimeCodeId])
REFERENCES [dbo].[DowntimeCodes] ([Id])
GO
ALTER TABLE [dbo].[MachineAssignments] CHECK CONSTRAINT [FK__Machines__downti__30F848ED]
GO
ALTER TABLE [dbo].[MachineAssignments]  WITH CHECK ADD  CONSTRAINT [FK__Machines__employ__300424B4] FOREIGN KEY([employeeId])
REFERENCES [dbo].[Employees] ([Id])
GO
ALTER TABLE [dbo].[MachineAssignments] CHECK CONSTRAINT [FK__Machines__employ__300424B4]
GO
ALTER TABLE [dbo].[MachineAssignments]  WITH CHECK ADD  CONSTRAINT [FK__Machines__machin__37A5467C] FOREIGN KEY([machineDetailId])
REFERENCES [dbo].[MachineDetails] ([Id])
GO
ALTER TABLE [dbo].[MachineAssignments] CHECK CONSTRAINT [FK__Machines__machin__37A5467C]
GO
ALTER TABLE [dbo].[MachineAssignments]  WITH CHECK ADD  CONSTRAINT [FK_MachineAssignments_Machines] FOREIGN KEY([machineId])
REFERENCES [dbo].[Machines] ([Id])
GO
ALTER TABLE [dbo].[MachineAssignments] CHECK CONSTRAINT [FK_MachineAssignments_Machines]
GO
USE [master]
GO
ALTER DATABASE [SupersChoice] SET  READ_WRITE 
GO
