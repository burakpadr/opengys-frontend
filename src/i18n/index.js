import { createI18n } from "vue-i18n";

const messages = {

  // TR

  tr: {
    enum: {
      invoiceType: {
        rentPayment: "Kira Faturası"
      },
      approvementStatus: {
        waiting: "Bekliyor",
        approved: "Onaylandı",
        rejected: "Reddedildi"
      },
      mainStatus: {
        forRent: "Kiralık"
      }
    },
    common: {
      add: "Ekle",
      upload: "Yükle",
      cancel: "İptal",
      delete: "Sil",
      edit: "Düzenle",
      save: "Kaydet",
      filter: "Filtrele",
      clear: "Temizle",
      approve: "Onayla",
      reject: "Reddet",
      yes: "Evet",
      no: "Hayır",
      search: "Ara",
      action: "Aksiyon",
      recordCreated: "Kayıt oluşturuldu",
      recordUpdated: "Kayıt güncellendi",
      recordDeleted: "Kayıt silindi",
      sureToDeleteTheRecord: "Kaydı silmek istediğinden emin misin?",
      published: "Yayında",
      notPublished: "Yayında Değil",
      approved: "Onaylandı",
      rejected: "Reddedildi",
      waiting: "Bekliyor"
    },
    navbar: {
      dashboard: "Dashboard",
      realEstates: "Gayrimenkuller",
      paymentManagement: "Ödeme Yönetimi",
      paymentDeclarations: "Ödeme Beyanları",
      systemDefinitions: "Sistem Tanımları",
      categories: "Kategoriler",
      advertPlaces: "İlan Yerleri",
      userManagement: "Kullanıcı Yönetimi",
      subUsers: "Alt Kullanıcılar",
      tenants: "Kiracılar",
      security: "Güvenlik",
      roles: "Roller"
    },
    header: {
      userTitle: {
        landlord: "Tapu Sahibi",
        tenant: "Kiracı"
      },
      exit: "Çıkış",
      selectLanguage: "Dil"
    },
    login: {
      header: "Giriş",
      email: "E-Posta",
      password: "Parola",
      signIn: "Giriş",
      forgotPassword: "Şifremi unuttum"
    },
    forgotPassword: {
      header: "Parola Sıfırla",
      step1: {
        email: "E-Posta",
        sendCode: "Kod Gönder"
      },
      step2: {
        code: "Kod",
        verify: "Doğrula",
        sendCodeAgain: "Kodu tekrar gönder"
      },
      step3: {
        newPassword: "Yeni Parola"
      },
      info: {
        codeSentToEmail: "Kod email adresinize gönderildi.",
        codeIsIncorrect: "Girdiğiniz kod hatalı!",
        passwordChanged: "Parolanız başarılı bir şekilde değiştirildi, yönlendiriliyorsunuz."
      }
    },
    dashboard: {
      unpaidRent: "Ödenmemiş Kira",
      upcomingRent: "Ödemesi Yaklaşan Kira",
      leaseStatementPendingApproval: "Onay Bekleyen Kira Beyanı",
      unpaid: "ödenmedi",
      upcoming: "ödemesi yaklaşan",
      pendingLeaseStatement: "onay bekleyen beyan",
      rentalIncomeByMonth: "Aylara Göre Kira Geliri",
      rentData: "Kira Verisi",
      realEstateDistributionByCategory: "Gayrimenkullerin Kategorilere Göre Dağılımı",
      occupancyRate: "Kiralanan Gayrimenkul Oranı",
      totalNumberOfRealEstate: "Toplam Gayrimenkul Sayısı",
      totalNumerOfRentedRealEstate: "Toplam Kiralanan Gayrimenkul Sayısı"
    },
    realEstate: {
      stepper: {
        properties: "Özellikler",
        photos: "Fotoğraflar",
        adverts: "ilanlar",
        contracts: "Sözleşmeler"
      },
      basicInformation: {
        basic: {
          header: "Temel Bilgiler",
          mainStatus: "Ana Statü",
          realEstateNo: "Gayrimenkul No"
        },
        address: {
          header: "Adres Bilgisi",
          city: "İl",
          district: "İlçe",
          neighborhood: "Mahalle",
          postCode: "Posta Kodu",
          latitude: "Enlem",
          longitude: "Boylam",
          address: "Açık Adres"
        },
        additional: {
          header: "Ek Özellikler",
          category: "Kategori",
          subcategory: "Alt Kategori"
        }
      },
      photo: {
        makeCoverPhoto: "Kapak Fotoğrafı Yap",
        dragAndDrop: "Dosyaları yüklemek için sürükle ve bırak.",
        imagesUploadedSuccessfully: "Fotoğraflar yüklendi",
        imagesRemoved: "Fotoğraflar silindi",
        coverPhotoUpdated: "Kapak fotoğrafı güncellendi"
      },
      advert: {
        list: {
          header: "İlan Listesi",
          advertPlace: "İlan Yeri",
          advertStartDate: "İlan Başlangıç T.",
          advertEndDate: "İlan Bitiş T.",
          advertAmount: "İlan Fiyatı",
          status: "Durumu",
          action: "Aksiyon"
        },
        form: {
          createFormHeader: "İlan Bilgisi Oluştur",
          updateFormHeader: "İlan Bilgisi Güncelle",
          advertPlace: "İlan Yeri",
          advertStartDate: "İlan Başlangıç Tarihi",
          advertEndDate: "İlan Bitiş Tarihi",
          advertAmount: "İlan Fiyatı",
          status: "Durumu",
          startDateCannotBeGreaterThanEndDate: "İlan başlangıç tarihi ilan bitiş tarihinden büyük olamaz!"
        }
      },
      contract: {
        list: {
          header: "Sözleşme Listesi",
          tenantTitle: "Kiracının Adı Soyadı",
          contractStartDate: "Sözleşme Başlangıç T.",
          contractEndDate: "Sözleşme Bitiş T.",
          contractFile: "Sözleşme",
          status: "Durumu",
          action: "Aksiyon",
          rentPaymentPlan: "Kira Ödeme Planı"
        },
        createUpdateForm: {
          createHeader: "Sözleşme Oluştur",
          updateHeader: "Sözleşme Güncelle",
          tenant: "Kiracı",
          contractStartDate: "Sözleşme Başlangıç Tarihi",
          contractEndDate: "Sözleşme Bitiş Tarihi",
          rentDay: "Kira Günü",
          monthlyRentFee: "Aylık Kira Bedeli",
          status: "Durumu",
          addContractFile: "Kira Sözleşmesi Ekle",
          viewContractFile: "Kira Sözleşmesini Görüntüle",
          updateContractFile: "Kira Sözleşmesini Güncelle",
          startDateCannotBeGreaterThanEndDate: "Sözleşme başlangıç tarihi sözleşme bitiş tarihinden büyük olamaz!"
        },
        rentPaymentPlan: {
          header: "Kira Ödeme Planı",
          rentalPeriod: "Kira Sayısı",
          rentDate: "Kira Tarihi",
          rentFee: "Kira Tutarı",
          receipt: "Dekont",
          status: "Durumu",
          paid: "Paid",
          unpaid: "Unpaid"
        }
      }
    },
    paymentManagement: {
      paymentDeclaration: {
        list: {
          realEstateNo: "Gayrimenkul No",
          invoiceType: "Fatura Türü",
          invoiceDate: "Fatura Tarihi",
          tenant: "Kiracı",
          receipt: "Dekont",
          approvementStatus: "Onay Durumu",
          action: "Aksiyon",
          sureToApprove: "Onaylamak istediğine emin misin?",
          sureToReject: "Reddetmek istediğine emin misin?"
        },
        filter: {
          invoiceType: "Fatura Türü",
          approvementStatus: "Onay Durumu"
        }
      }
    },
    systemDefinition: {
      category: {
        list: {
          categoryName: "Kategori Adı",
          action: "Aksiyon",
          search: "Ara"
        },
        form: {
          categoryInfo: {
            header: "Kategori Bilgisi",
            categoryName: "Kategori Adı"
          },
          subcategoryInfo: {
            header: "Alt Kategori Bilgisi",
            addSubcategory: "Alt Kategori Ekle",
            subcategoryName: "Alt Kategori Adı"
          }
        }
      },
      advertPlace: {
        list: {
          name: "İsim",
          action: "Aksiyon"
        },
        form: {
          createHeader: "Yeni Ekle",
          updateHeader: "Güncelle",
          name: "İsim"
        }
      }
    },
    userManagement: {
      staff: {
        list: {
          nameSurname: "Adı Soyadı",
          email: "E-Posta",
          role: "Rol",
        },
        form: {
          createHeader: "Ekle",
          updateHeader: "Güncelle",
          name: "Ad",
          surname: "Soyad",
          email: "E-Posta",
          role: "Rol"
        }
      },
      tenant: {
        list: {
          nameSurname: "Adı Soyadı",
          email: "E-Posta",
          relatedRealEstateNo: "Bağlı Gayrimenkul No",
        },
        form: {
          createHeader: "Ekle",
          updateHeader: "Güncelle",
          name: "Ad",
          surname: "Soyad",
          email: "E-Posta"
        }
      }
    },
    security: {
      role: {
        list: {
          roleName: "Rol Adı"
        },
        form: {
          roleInfo: {
            header: "Rol Bilgisi",
            name: "Rol Adı"
          },
          page: {
            header: "Sayfalar",
            pageName: "Sayfa Adı"
          },
          selectedPage: {
            header: "Seçilen Sayfalar",
            pageName: "Sayfa Adı"
          }
        }
      }
    },
    tenant: {
      paymentDeclaration: {
        list: {
          invoiceType: "Fatura Türü",
          invoiceDate: "Fatura Tarihi",
          receipt: "Dekont",
          approvementStatus: "Onay Durumu"
        },
        form: {
          header: "Ekle",
          invoiceType: "Fatura Türü",
          invoiceDate: "Fatura Tarihi",
          addReceipt: "Dekont Ekle"
        },
        filter: {
          invoiceType: "Fatura Türü",
          approvementStatus: "Onay Durumu"
        }
      }
    }
  },

  // EN

  en: {
    enum: {
      invoiceType: {
        rentPayment: "Rent Payment"
      },
      approvementStatus: {
        waiting: "Waiting",
        approved: "Approved",
        rejected: "Rejected"
      },
      mainStatus: {
        forRent: "For Rent"
      }
    },
    common: {
      add: "Add",
      upload: "Upload",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      save: "Save",
      filter: "Filter",
      clear: "Clear",
      approve: "Approve",
      reject: "Reject",
      yes: "Yes",
      no: "No",
      search: "Search",
      action: "Action",
      recordCreated: "Record created",
      recordUpdated: "Record updated",
      recordDeleted: "Record deleted",
      sureToDeleteTheRecord: "Are you sure to delete the record?",
      published: "Published",
      notPublished: "Not Published",
      approved: "Approved",
      rejected: "Rejected",
      waiting: "Waiting"
    },
    navbar: {
      dashboard: "Dashboard",
      realEstates: "Real Estates",
      paymentManagement: "Payment Management",
      paymentDeclarations: "Payment Decalarations",
      systemDefinitions: "System Definitions",
      categories: "Categories",
      advertPlaces: "Advert Places",
      userManagement: "User Management",
      subUsers: "Sub Users",
      tenants: "Tenants",
      security: "Security",
      roles: "Roles"
    },
    header: {
      userTitle: {
        landlord: "Landlord",
        tenant: "Tenant"
      },
      exit: "Exit",
      selectLanguage: "Language"
    },
    login: {
      header: "Login",
      email: "E-Mail Address",
      password: "Password",
      signIn: "Sign In",
      forgotPassword: "Forgot Password?"
    },
    forgotPassword: {
      header: "Reset Password",
      step1: {
        email: "E-Mail Address",
        sendCode: "Send Code"
      },
      step2: {
        code: "Code",
        verify: "Verify",
        sendCodeAgain: "Send code again"
      },
      step3: {
        newPassword: "New Password"
      },
      info: {
        codeSentToEmail: "The code sent your email address.",
        codeIsIncorrect: "The code is incorrect!",
        passwordChanged: "The password changed, you are being directed."
      }
    },
    dashboard: {
      unpaidRent: "Unpaid Rent",
      upcomingRent: "Upcoming Rent",
      leaseStatementPendingApproval: "Lease Statement Pending Approval",
      unpaid: "Unpaid",
      upcoming: "Upcoming",
      pendingLeaseStatement: "Pending Lease Statement",
      rentalIncomeByMonth: "Rental Income By Month",
      rentData: "Rent Data",
      realEstateDistributionByCategory: "Real Estate Distribution By Category",
      occupancyRate: "Occupancy Rate",
      totalNumberOfRealEstate: "Total Number Of Real Estate",
      totalNumerOfRentedRealEstate: "Total Number Of Rented Real Estate"
    },
    realEstate: {
      stepper: {
        properties: "Properties",
        photos: "Photos",
        adverts: "Adverts",
        contracts: "Contracts"
      },
      basicInformation: {
        basic: {
          header: "Basic Information",
          mainStatus: "Main Status",
          realEstateNo: "Real Estate No"
        },
        address: {
          header: "Address Information",
          city: "City",
          district: "District",
          neighborhood: "Neighborhood",
          postCode: "Post Code",
          latitude: "Latitude",
          longitude: "Longitude",
          address: "Address"
        },
        additional: {
          header: "Additional Information",
          category: "Category",
          subcategory: "Subcategory"
        }
      },
      photo: {
        makeCoverPhoto: "Make Cover Photo",
        dragAndDrop: "Drag and drop to upload files.",
        imagesUploadedSuccessfully: "Images uploaded",
        imagesRemoved: "Images removed",
        coverPhotoUpdated: "Cover photo updated"
      },
      advert: {
        list: {
          header: "Advert List",
          advertPlace: "Advert Place",
          advertStartDate: "Advert Start D.",
          advertEndDate: "Advert End D.",
          advertAmount: "Advert Amount",
          status: "Status",
          action: "Action",
        },
        form: {
          createFormHeader: "Create Advert",
          updateFormHeader: "Update Advert",
          advertPlace: "Advert Place",
          advertStartDate: "Advert Start Date",
          advertEndDate: "Advert End Date",
          advertAmount: "Advert Amount",
          status: "Status",
          startDateCannotBeGreaterThanEndDate: "Start date cannot be greater than end date"
        }
      },
      contract: {
        list: {
          header: "Contract List",
          tenantTitle: "Tenant",
          contractStartDate: "Contract Start D.",
          contractEndDate: "Contract End D.",
          contractFile: "Contract",
          status: "Status",
          action: "Action",
          rentPaymentPlan: "Rent Payment Plan"
        },
        createUpdateForm: {
          createHeader: "Create Contract",
          updateHeader: "Update Contract",
          tenant: "Tenant",
          contractStartDate: "Contract Start Date",
          contractEndDate: "Contract End Date",
          rentDay: "Rent Day",
          monthlyRentFee: "Monthly Rent Fee",
          status: "Status",
          addContractFile: "Add Contract File",
          viewContractFile: "View Contract File",
          updateContractFile: "Update Contract File",
          startDateCannotBeGreaterThanEndDate: "Start date cannot be greater than end date"
        },
        rentPaymentPlan: {
          header: "Rent Payment Plan",
          rentalPeriod: "Rental Period",
          rentDate: "Rent Date",
          rentFee: "Rent Fee",
          receipt: "Receipt",
          status: "Status",
          paid: "Paid",
          unpaid: "Unpaid"
        }
      }
    },
    paymentManagement: {
      paymentDeclaration: {
        list: {
          realEstateNo: "Real Estate No",
          invoiceType: "Invoice Type",
          invoiceDate: "Invoice Date",
          tenant: "Tenant",
          receipt: "Receipt",
          approvementStatus: "Appr. Status",
          action: "Action",
          sureToApprove: "Are you sure to approve?",
          sureToReject: "Are you sure to reject?"
        },
        filter: {
          invoiceType: "Invoice Type",
          approvementStatus: "Appr. Status"
        }
      }
    },
    systemDefinition: {
      category: {
        list: {
          categoryName: "Category Name",
          action: "Action",
          search: "Search"
        },
        form: {
          categoryInfo: {
            header: "Category Information",
            categoryName: "Category Name"
          },
          subcategoryInfo: {
            header: "Subcategory Information",
            addSubcategory: "Add Subcategory",
            subcategoryName: "Subcategory Name"
          }
        }
      },
      advertPlace: {
        list: {
          name: "Name",
          action: "Action"
        },
        form: {
          createHeader: "Add New",
          updateHeader: "Update",
          name: "Name"
        }
      }
    },
    userManagement: {
      staff: {
        list: {
          nameSurname: "Name Surname",
          email: "E-Mail Address",
          role: "Role",
        },
        form: {
          createHeader: "Create",
          updateHeader: "Update",
          name: "Name",
          surname: "Surname",
          email: "E-Mail Address",
          role: "Role"
        }
      },
      tenant: {
        list: {
          nameSurname: "Name Surname",
          email: "E-Mail Address",
          relatedRealEstateNo: "Related Real Estate No",
        },
        form: {
          createHeader: "Create",
          updateHeader: "Update",
          name: "Name",
          surname: "Surname",
          email: "E-Mail Address"
        }
      }
    },
    security: {
      role: {
        list: {
          roleName: "Role Name"
        },
        form: {
          roleInfo: {
            header: "Role Information",
            name: "Role Name"
          },
          page: {
            header: "Pages",
            pageName: "Page Name"
          },
          selectedPage: {
            header: "Selected Pages",
            pageName: "Page Name"
          }
        }
      }
    },
    tenant: {
      paymentDeclaration: {
        list: {
          invoiceType: "Invoice Type",
          invoiceDate: "Invoice Date",
          receipt: "Receipt",
          approvementStatus: "Appr. Status"
        },
        form: {
          header: "Create",
          invoiceType: "Invoice Type",
          invoiceDate: "Invoice Date",
          addReceipt: "Add Receipt"
        },
        filter: {
          invoiceType: "Invoice Type",
          approvementStatus: "Appr. Status"
        }
      }
    }
  },
}

export default createI18n({
  locale: localStorage.getItem('locale'),
  fallbackLocale: process.env.VUE_APP_FALLBACK_LOCALE,
  legacy: false,
  messages
})